import { Button, Flex, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { useMobile } from "lib/app-provider";
import { useContractStore } from "lib/providers/store";
import type { ContractDetail } from "lib/services/contractService";
import { useContractDetailByContractAddress } from "lib/services/contractService";
import type { ContractLocalInfo } from "lib/stores/contract";
import type { Addr, ContractAddr, Option } from "lib/types";

import { ExplorerLink } from "./ExplorerLink";
import { CustomIcon } from "./icon";
import { LoadingOverlay } from "./LoadingOverlay";
import { EditContractDetailsModal, SaveContractDetailsModal } from "./modal";
import {
  SelectContractAdmin,
  SelectContractInstantiator,
} from "./select-contract";

interface DisplayNameProps {
  notSelected: boolean;
  isValid: boolean;
  name?: string;
  label: string;
}

interface ContractDetailsButtonProps {
  contractAddress: ContractAddr;
  contractLocalInfo: Option<ContractLocalInfo>;
  instantiator: Addr;
  label: string;
}

interface ContractSelectSectionProps {
  mode: "all-lists" | "only-admin";
  contractAddress: ContractAddr;
  onContractSelect: (contract: ContractAddr) => void;
  successCallback?: (data: ContractDetail) => void;
}

const modeStyle = (mode: string) => {
  switch (mode) {
    case "all-lists":
      return {
        container: "0px",
        contractAddrContainer: "70%",
        contractAddrW: "auto",
        contractNameContainer: "30%",
      };
    case "only-admin":
      return {
        container: "12",
        contractAddrContainer: "40%",
        contractAddrW: "144px",
        contractNameContainer: "60%",
      };
    default:
      return {
        container: "12",
        contractAddrContainer: "40%",
        contractAddrW: "auto",
        contractNameContainer: "60%",
      };
  }
};

const DisplayName = ({
  notSelected,
  isValid,
  name,
  label,
}: DisplayNameProps) => {
  const displayName = useMemo(() => {
    if (notSelected) return "Not Selected";
    if (!isValid) return "Invalid Contract";
    return name ?? label;
  }, [isValid, label, name, notSelected]);

  return (
    <Text
      textColor={notSelected ? "text.disabled" : "text.dark"}
      variant="body2"
    >
      {displayName}
    </Text>
  );
};

const ContractDetailsButton = ({
  contractAddress,
  contractLocalInfo,
  instantiator,
  label,
}: ContractDetailsButtonProps) => {
  const isMobile = useMobile();
  const isExist = !!contractLocalInfo?.lists;
  if (isMobile) return null;
  return isExist ? (
    <EditContractDetailsModal
      contractLocalInfo={contractLocalInfo}
      triggerElement={
        <Button
          variant="ghost-gray"
          float="right"
          size="sm"
          leftIcon={<CustomIcon name="edit" />}
        >
          Edit
        </Button>
      }
    />
  ) : (
    <SaveContractDetailsModal
      contractLocalInfo={{
        contractAddress,
        instantiator,
        label,
        ...contractLocalInfo,
      }}
      triggerElement={
        <Button
          variant="outline-gray"
          float="right"
          size="sm"
          leftIcon={<CustomIcon name="bookmark" boxSize="12px" />}
        >
          Add To List
        </Button>
      }
    />
  );
};

export const ContractSelectSection = observer(
  ({
    mode,
    contractAddress,
    onContractSelect,
    successCallback,
  }: ContractSelectSectionProps) => {
    const { getContractLocalInfo } = useContractStore();
    const isMobile = useMobile();

    const contractLocalInfo = getContractLocalInfo(contractAddress);
    const {
      watch,
      reset,
      formState: { defaultValues },
    } = useForm({
      defaultValues: {
        isValid: false,
        instantiator: "",
        label: "",
      },
      mode: "all",
    });

    const { refetch, isFetching } = useContractDetailByContractAddress(
      contractAddress,
      (data) => {
        successCallback?.(data);
        reset({
          isValid: true,
          instantiator: data.instantiator,
          label: data.label,
        });
      },
      () => {
        reset(defaultValues);
      }
    );

    useEffect(() => {
      if (!contractLocalInfo) {
        if (contractAddress) refetch();
      } else {
        reset({
          isValid: true,
          instantiator: contractLocalInfo.instantiator,
          label: contractLocalInfo.label,
        });
      }
    }, [contractAddress, contractLocalInfo, reset, refetch]);

    const contractState = watch();
    const notSelected = contractAddress.length === 0;
    const style = modeStyle(mode);

    return (
      <>
        {isFetching && <LoadingOverlay />}
        <Flex
          mb={style.container}
          borderWidth="thin"
          borderColor="gray.800"
          p={4}
          borderRadius="8px"
          fontSize="12px"
          justify="space-between"
          align="center"
          width="full"
        >
          <Flex gap={4} width="100%" direction={{ base: "column", md: "row" }}>
            <Flex
              direction="column"
              width={{ base: "auto", md: style.contractAddrContainer }}
            >
              Contract Address
              {!notSelected ? (
                <ExplorerLink
                  value={contractAddress}
                  type="contract_address"
                  showCopyOnHover
                  // TODO - Revisit not necessary if disable UI for mobile is implemented
                  textFormat={
                    isMobile || mode === "only-admin" ? "truncate" : "normal"
                  }
                  maxWidth="none"
                  minWidth={style.contractAddrW}
                  wordBreak="break-all"
                />
              ) : (
                <Text color="text.disabled" variant="body2">
                  Not Selected
                </Text>
              )}
            </Flex>
            <Flex
              direction="column"
              width={{ base: "auto", md: style.contractNameContainer }}
            >
              Contract Name
              <DisplayName
                notSelected={notSelected}
                isValid={contractState.isValid}
                name={contractLocalInfo?.name}
                label={contractState.label}
              />
            </Flex>
            <Flex gap={2} alignItems="center">
              {mode === "all-lists" && contractState.isValid && (
                <ContractDetailsButton
                  contractAddress={contractAddress}
                  contractLocalInfo={contractLocalInfo}
                  instantiator={contractState.instantiator as Addr}
                  label={contractState.label}
                />
              )}
              {mode === "all-lists" ? (
                <SelectContractInstantiator
                  notSelected={notSelected}
                  onContractSelect={onContractSelect}
                />
              ) : (
                <SelectContractAdmin
                  notSelected={notSelected}
                  onContractSelect={onContractSelect}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  }
);
