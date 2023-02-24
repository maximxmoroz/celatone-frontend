import { Button, Heading, Text } from "@chakra-ui/react";
import type { InstantiateResult } from "@cosmjs/cosmwasm-stargate";
import type { Coin } from "@cosmjs/stargate";
import { useWallet } from "@cosmos-kit/react";
import { useQuery } from "@tanstack/react-query";
import Long from "long";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  useFabricateFee,
  useNativeTokensInfo,
  useSimulateFee,
  useInstantiateTx,
  useCelatoneApp,
} from "lib/app-provider";
import { CodeSelectSection } from "lib/components/CodeSelectSection";
import { ConnectWalletAlert } from "lib/components/ConnectWalletAlert";
import type { FormStatus } from "lib/components/forms";
import { ControllerInput } from "lib/components/forms";
import { AssetInput } from "lib/components/forms/AssetInput";
import JsonInput from "lib/components/json/JsonInput";
import { Stepper } from "lib/components/stepper";
import WasmPageContainer from "lib/components/WasmPageContainer";
import { useLCDEndpoint, useValidateAddress } from "lib/hooks";
import { useTxBroadcast } from "lib/providers/tx-broadcast";
import {
  AmpEvent,
  AmpTrack,
  AmpTrackAction,
  AmpTrackToInstantiate,
} from "lib/services/amplitude";
import { getCodeIdInfo } from "lib/services/code";
import type { HumanAddr, Token, U } from "lib/types";
import { InstantiatePermission, MsgType } from "lib/types";
import {
  composeMsg,
  demicrofy,
  fabricateFunds,
  jsonValidate,
  libDecode,
} from "lib/utils";

import { FailedModal, Footer } from "./component";
import type { InstantiateRedoMsg } from "./types";

interface InstantiatePageProps {
  onComplete: (txResult: InstantiateResult, contractLabel: string) => void;
}

const Instantiate = ({ onComplete }: InstantiatePageProps) => {
  // ------------------------------------------//
  // ---------------DEPENDENCIES---------------//
  // ------------------------------------------//
  const router = useRouter();
  const msgQuery = (router.query.msg as string) ?? "";
  const codeIdQuery = (router.query["code-id"] as string) ?? "";
  const {
    appContractAddress: { example: exampleContractAddress },
  } = useCelatoneApp();
  const { address = "" } = useWallet();
  const endpoint = useLCDEndpoint();
  const postInstantiateTx = useInstantiateTx();
  const { simulate } = useSimulateFee();
  const fabricateFee = useFabricateFee();
  const { broadcast } = useTxBroadcast();
  const nativeTokensInfo = useNativeTokensInfo();
  const { validateUserAddress, validateContractAddress } = useValidateAddress();

  // ------------------------------------------//
  // ------------------STATES------------------//
  // ------------------------------------------//
  const [simulating, setSimulating] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ state: "init" });

  // ------------------------------------------//
  // ----------------FORM HOOKS----------------//
  // ------------------------------------------//
  const {
    control,
    formState: { errors: formErrors },
    setValue,
    watch,
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      codeId: "",
      label: "",
      adminAddress: "",
      initMsg: "",
      assets: [{ denom: "", amount: "" }] as Coin[],
      simulateError: "",
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
  });
  const {
    codeId,
    adminAddress: watchAdminAddress,
    assets: watchAssets,
    initMsg: watchInitMsg,
    simulateError,
  } = watch();

  const selectedAssets = watchAssets.map((asset) => asset.denom);

  const disableInstantiate = useMemo(() => {
    return (
      !codeId ||
      !address ||
      !!jsonValidate(watchInitMsg) ||
      Object.keys(formErrors).length > 0 ||
      status.state !== "success"
    );
    // formErrors change doesnt trigger this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeId, address, watchInitMsg, Object.keys(formErrors), status.state]);

  const assetOptions = useMemo(
    () =>
      nativeTokensInfo.map((asset) => ({
        label: asset.symbol,
        value: asset.base,
        disabled: selectedAssets.includes(asset.base),
      })),
    [nativeTokensInfo, selectedAssets]
  );

  const { refetch } = useQuery(
    ["query", endpoint, codeId],
    async () => getCodeIdInfo(endpoint, Number(codeId)),
    {
      enabled: !!address && !!codeId.length,
      retry: false,
      cacheTime: 0,
      onSuccess(data) {
        const permission = data.code_info.instantiate_permission;
        if (
          address &&
          (permission.permission === InstantiatePermission.EVERYBODY ||
            permission.addresses.includes(address as HumanAddr) ||
            permission.address === address)
        )
          setStatus({ state: "success" });
        else {
          setStatus({
            state: "error",
            message:
              "This wallet does not have permission to instantiate to this code",
          });
        }
      },
      onError() {
        setStatus({ state: "error", message: "This code ID does not exist" });
      },
    }
  );

  // ------------------------------------------//
  // ----------------FUNCTIONS-----------------//
  // ------------------------------------------//
  const proceed = useCallback(() => {
    handleSubmit(async ({ adminAddress, label, initMsg, assets }) => {
      AmpTrackAction(
        AmpEvent.ACTION_INSTANTIATE,
        assets.filter((asset) => Number(asset.amount) && asset.denom).length
      );
      setSimulating(true);
      const funds = fabricateFunds(assets);
      const msg = composeMsg(MsgType.INSTANTIATE, {
        sender: address as HumanAddr,
        admin: adminAddress as HumanAddr,
        codeId: Long.fromString(codeId),
        label,
        msg: Buffer.from(initMsg),
        funds,
      });
      try {
        const estimatedFee = await simulate([msg]);
        const stream = await postInstantiateTx({
          estimatedFee: estimatedFee ? fabricateFee(estimatedFee) : undefined,
          codeId: Number(codeId),
          initMsg: JSON.parse(initMsg),
          label,
          admin: adminAddress,
          funds,
          onTxSucceed: onComplete,
        });

        if (stream) broadcast(stream);
        setSimulating(false);
      } catch (e) {
        setValue("simulateError", (e as Error).message);
        setSimulating(false);
      }
    })();
  }, [
    address,
    codeId,
    handleSubmit,
    fabricateFee,
    postInstantiateTx,
    simulate,
    broadcast,
    onComplete,
    setValue,
  ]);

  // ------------------------------------------//
  // --------------SIDE EFFECTS----------------//
  // ------------------------------------------//
  useEffect(() => {
    if (codeId.length) {
      setStatus({ state: "loading" });
      const timer = setTimeout(() => {
        refetch();
      }, 500);
      return () => clearTimeout(timer);
    }
    setStatus({ state: "init" });

    return () => {};
  }, [address, codeId, refetch]);

  useEffect(() => {
    if (codeIdQuery) setValue("codeId", codeIdQuery);
    if (msgQuery) {
      const decodedMsg = libDecode(msgQuery);
      try {
        const msgObject = JSON.parse(decodedMsg) as InstantiateRedoMsg;

        reset({
          codeId: msgObject.code_id.toString(),
          label: msgObject.label,
          adminAddress: msgObject.admin,
          initMsg: JSON.stringify(msgObject.msg, null, 2),
          assets:
            msgObject.funds.length === 0
              ? [{ denom: "", amount: "" }]
              : msgObject.funds.map((fund) => ({
                  ...fund,
                  amount: demicrofy(fund.amount as U<Token>).toFixed(),
                })),
        });
      } catch {
        // comment just to avoid eslint no-empty
      }
    }
  }, [codeIdQuery, msgQuery, reset, setValue]);

  useEffect(() => {
    if (router.isReady) AmpTrackToInstantiate(!!msgQuery, !!codeIdQuery);
  }, [router.isReady, msgQuery, codeIdQuery]);

  const validateAdmin = useCallback(
    (input: string) =>
      input && !!validateContractAddress(input) && !!validateUserAddress(input)
        ? "Invalid Address."
        : undefined,
    [validateContractAddress, validateUserAddress]
  );

  return (
    <>
      <WasmPageContainer>
        <Text variant="body1" color="text.dark" mb={3} fontWeight={700}>
          DEPLOY NEW CONTRACT
        </Text>
        <Stepper mode="deploy" currentStep={2} />
        <Heading as="h4" variant="h4" my="48px">
          Instantiate new contract
        </Heading>
        <ConnectWalletAlert
          subtitle="You need to connect your wallet to perform this action"
          mb={6}
        />
        <CodeSelectSection
          name="codeId"
          control={control}
          status={status}
          error={formErrors.codeId?.message}
          onCodeSelect={(code: string) => setValue("codeId", code)}
          codeId={codeId}
        />
        <form style={{ width: "100%" }}>
          <ControllerInput
            name="label"
            control={control}
            error={formErrors.label?.message}
            placeholder="ex. Token Factory"
            label="Label"
            helperText="The contract's label help briefly describe the contract and what it does."
            variant="floating"
            mb="32px"
            rules={{ required: "Label is required" }}
          />
          <ControllerInput
            name="adminAddress"
            control={control}
            label="Admin Address (optional)"
            placeholder={`ex. ${exampleContractAddress}`}
            helperText="The contract's admin will be able to migrate and update future admins."
            variant="floating"
            error={validateAdmin(watchAdminAddress)}
            helperAction={
              <Text
                color="honeydew.main"
                fontWeight="600"
                variant="body3"
                cursor="pointer"
                onClick={() => {
                  AmpTrack(AmpEvent.USE_ASSIGN_ME);
                  setValue("adminAddress", address);
                }}
              >
                Assign me
              </Text>
            }
          />
          <Heading variant="h6" as="h6" my="32px" alignSelf="flex-start">
            Instantiate Message
          </Heading>
          <JsonInput
            text={watchInitMsg}
            setText={(newVal: string) => setValue("initMsg", newVal)}
            height="120px"
          />
          <Heading variant="h6" as="h6" my="32px" alignSelf="flex-start">
            Send asset to contract
          </Heading>
          {fields.map((field, idx) => (
            <AssetInput
              key={field.id}
              disableDelete={fields.length <= 1}
              onDelete={() => remove(idx)}
              setCurrencyValue={(newVal: string) =>
                setValue(`assets.${idx}.denom`, newVal)
              }
              assetOptions={assetOptions}
              initialSelected={field.denom}
              amountInput={
                /**
                 * @remarks refactor along with execute page
                 */
                <ControllerInput
                  name={`assets.${idx}.amount`}
                  control={control}
                  label="Amount"
                  variant="floating"
                  type="number"
                  rules={{
                    pattern: {
                      // Move to constant
                      value: /^[0-9]+([.][0-9]{0,6})?$/i,
                      message: 'Invalid amount. e.g. "100.00"',
                    },
                  }}
                  error={formErrors.assets?.[idx]?.amount?.message}
                />
              }
            />
          ))}
          <Button
            variant="outline-primary"
            mt="32px"
            mx="auto"
            onClick={() => append({ denom: "", amount: "" })}
            disabled={assetOptions.length === selectedAssets.length}
          >
            Add More Asset
          </Button>
        </form>
      </WasmPageContainer>
      <Footer
        onInstantiate={proceed}
        disabled={disableInstantiate}
        loading={simulating}
      />
      {simulateError && (
        <FailedModal
          errorLog={simulateError}
          onClose={() => setValue("simulateError", "")}
        />
      )}
    </>
  );
};

export default Instantiate;
