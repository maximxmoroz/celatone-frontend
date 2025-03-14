import { Button, Flex, Heading } from "@chakra-ui/react";
import type { StdFee } from "@cosmjs/stargate";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { AmpEvent, trackToAdminUpdate, track } from "lib/amplitude";
import {
  useFabricateFee,
  useInternalNavigate,
  useSimulateFeeQuery,
  useUpdateAdminTx,
  useGetAddressType,
  useValidateAddress,
  useWasmConfig,
  useCurrentChain,
} from "lib/app-provider";
import { ConnectWalletAlert } from "lib/components/ConnectWalletAlert";
import { ContractSelectSection } from "lib/components/ContractSelectSection";
import { ErrorMessageRender } from "lib/components/ErrorMessageRender";
import { EstimatedFeeRender } from "lib/components/EstimatedFeeRender";
import type { FormStatus } from "lib/components/forms";
import { TextInput } from "lib/components/forms";
import WasmPageContainer from "lib/components/WasmPageContainer";
import { useTxBroadcast } from "lib/providers/tx-broadcast";
import { useContractDetailByContractAddress } from "lib/services/contractService";
import type { Addr, ContractAddr, HumanAddr } from "lib/types";
import { MsgType } from "lib/types";
import { composeMsg, getFirstQueryParam } from "lib/utils";

const UpdateAdmin = () => {
  useWasmConfig({ shouldRedirect: true });
  const router = useRouter();
  const { address } = useCurrentChain();
  const { validateContractAddress, validateUserAddress } = useValidateAddress();
  const getAddressType = useGetAddressType();
  const navigate = useInternalNavigate();
  const fabricateFee = useFabricateFee();
  const updateAdminTx = useUpdateAdminTx();
  const { broadcast } = useTxBroadcast();

  const [adminAddress, setAdminAddress] = useState("");
  const [adminFormStatus, setAdminFormStatus] = useState<FormStatus>({
    state: "init",
  });
  const [estimatedFee, setEstimatedFee] = useState<StdFee>();
  const [simulateError, setSimulateError] = useState<string>();

  const contractAddressParam = getFirstQueryParam(
    router.query.contract
  ) as ContractAddr;

  const onContractPathChange = useCallback(
    (contract?: ContractAddr) => {
      navigate({
        pathname: "/admin",
        query: { ...(contract && { contract }) },
        options: { shallow: true },
      });
    },
    [navigate]
  );

  const { isFetching } = useSimulateFeeQuery({
    enabled:
      !!address &&
      !!contractAddressParam &&
      adminFormStatus.state === "success",
    messages: [
      composeMsg(MsgType.UPDATE_ADMIN, {
        sender: address as HumanAddr,
        newAdmin: adminAddress as Addr,
        contract: contractAddressParam,
      }),
    ],
    onSuccess: (fee) => {
      if (fee) {
        setSimulateError(undefined);
        setEstimatedFee(fabricateFee(fee));
      } else setEstimatedFee(undefined);
    },
    onError: (e) => {
      setSimulateError(e.message);
      setEstimatedFee(undefined);
    },
  });

  const proceed = useCallback(async () => {
    track(AmpEvent.ACTION_ADMIN_UPDATE);
    const stream = await updateAdminTx({
      contractAddress: contractAddressParam,
      newAdmin: adminAddress as Addr,
      estimatedFee,
    });

    if (stream) broadcast(stream);
  }, [
    adminAddress,
    contractAddressParam,
    updateAdminTx,
    broadcast,
    estimatedFee,
  ]);

  /**
   * @remarks Contract admin validation
   */
  useContractDetailByContractAddress(
    contractAddressParam as ContractAddr,
    (contractDetail) => {
      if (contractDetail.admin !== address) onContractPathChange();
    },
    () => onContractPathChange()
  );

  useEffect(() => {
    if (contractAddressParam && validateContractAddress(contractAddressParam)) {
      onContractPathChange();
    }
  }, [contractAddressParam, onContractPathChange, validateContractAddress]);

  /**
   * @remarks Reset states on update admin succeed modal close
   */
  useEffect(() => {
    setAdminAddress("");
    setAdminFormStatus({
      state: "init",
    });
    setEstimatedFee(undefined);
    setSimulateError(undefined);
  }, [router.asPath]);

  /**
   * @remarks Admin address input validation
   */
  useEffect(() => {
    if (!adminAddress) setAdminFormStatus({ state: "init" });
    else {
      const addressType = getAddressType(adminAddress);
      if (addressType === "invalid_address") {
        setAdminFormStatus({
          state: "error",
          message: "Invalid address length",
        });
      } else {
        const validateResult =
          addressType === "user_address"
            ? validateUserAddress(adminAddress)
            : validateContractAddress(adminAddress);
        if (validateResult) {
          setAdminFormStatus({ state: "error", message: validateResult });
        } else {
          setAdminFormStatus({ state: "success" });
        }
      }
    }
  }, [
    adminAddress,
    getAddressType,
    validateContractAddress,
    validateUserAddress,
  ]);

  useEffect(() => {
    if (router.isReady) trackToAdminUpdate(!!contractAddressParam);
  }, [contractAddressParam, router.isReady]);

  return (
    <WasmPageContainer>
      <Heading as="h5" variant="h5" mb={6}>
        Update Admin
      </Heading>
      <ConnectWalletAlert
        mb={6}
        subtitle="You need to connect your wallet to perform this action"
      />
      <ContractSelectSection
        mode="only-admin"
        contractAddress={contractAddressParam}
        onContractSelect={(contract) => onContractPathChange(contract)}
      />
      <TextInput
        variant="fixed-floating"
        label="New Admin Address"
        helperText="This address will be an admin for the deployed smart contract."
        value={adminAddress}
        setInputState={setAdminAddress}
        status={adminFormStatus}
      />
      <Flex
        fontSize="14px"
        color="text.dark"
        alignItems="center"
        alignSelf="flex-start"
        gap={1}
        mt={12}
      >
        <p>Transaction Fee:</p>
        <EstimatedFeeRender estimatedFee={estimatedFee} loading={isFetching} />
      </Flex>
      {simulateError && (
        <ErrorMessageRender
          error={simulateError}
          mt={4}
          alignSelf="flex-start"
        />
      )}
      <Button disabled={!estimatedFee || isFetching} onClick={proceed} mt={12}>
        Update Admin
      </Button>
    </WasmPageContainer>
  );
};

export default UpdateAdmin;
