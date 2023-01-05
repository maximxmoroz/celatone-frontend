import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import router from "next/router";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdInput,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";

import { ExplorerLink } from "lib/components/ExplorerLink";
import {
  AddToOtherList,
  EditContractDetails,
  SaveContractDetails,
} from "lib/components/modal";
import type { ContractDetail } from "lib/model/contract";
import type { ContractAddr } from "lib/types";

interface ContractTopProps {
  contractDetail: ContractDetail;
}
export const ContractTop = ({ contractDetail }: ContractTopProps) => {
  const { contractInfo } = contractDetail;
  const { instantiateInfo } = contractDetail;
  const { publicInfo } = contractDetail;

  const contractAddress = instantiateInfo?.contractAddress as ContractAddr;

  const displayName =
    contractInfo?.name || publicInfo?.name || instantiateInfo?.label;

  const goToQuery = () => {
    router.push({
      pathname: "/query",
      query: { ...(contractAddress && { contract: contractAddress }) },
    });
  };

  const goToExecute = () => {
    router.push({
      pathname: "/execute",
      query: { ...(contractAddress && { contract: contractAddress }) },
    });
  };

  const renderSaveButton = () => {
    if (contractInfo) {
      return (
        <AddToOtherList
          contractInfo={contractInfo}
          triggerElement={
            <IconButton
              fontSize="22px"
              variant="none"
              aria-label="save"
              color={contractInfo.lists ? "primary.main" : "gray.600"}
              icon={contractInfo.lists ? <MdBookmark /> : <MdBookmarkBorder />}
            />
          }
        />
      );
    }
    if (instantiateInfo) {
      return (
        <SaveContractDetails
          contractInfo={{
            contractAddress,
            instantiator: instantiateInfo.instantiator,
            label: instantiateInfo.label,
            created: instantiateInfo.createdTime,
          }}
          triggerElement={
            <IconButton
              fontSize="22px"
              variant="none"
              aria-label="save"
              color="none"
              icon={<MdBookmarkBorder />}
            />
          }
        />
      );
    }
    return null;
  };

  return (
    <Flex justify="space-between" my={6}>
      <Flex direction="column" gap={1} textOverflow="ellipsis" maxW="670px">
        <Heading as="h5" variant="h5" color="text.main" className="ellipsis">
          {displayName}
        </Heading>
        <Flex gap={2}>
          <Text
            color="text.dark"
            variant="body2"
            fontWeight={500}
            whiteSpace="nowrap"
          >
            Contract Address:
          </Text>
          <ExplorerLink
            type="contract_address"
            value={contractAddress}
            textFormat="normal"
            maxWidth="none"
          />
        </Flex>
        <Flex gap={2}>
          <Text color="text.dark" variant="body2" fontWeight={500}>
            Label:
          </Text>
          <Text variant="body2" className="ellipsis">
            {contractDetail.instantiateInfo?.label}
          </Text>
        </Flex>
        {publicInfo?.name && (
          <Flex gap={2}>
            <Text color="text.dark" variant="body2" fontWeight={500}>
              Public Contract Name:
            </Text>
            <Text variant="body2" className="ellipsis">
              {publicInfo?.name}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex gap={4} w="fit-content">
        {/* TODO - Revisit, implement admin button */}
        <Button
          variant="outline-gray"
          rightIcon={<Icon as={MdKeyboardArrowDown} boxSize="18px" />}
        >
          Admin
        </Button>
        <Button
          variant="outline-primary"
          leftIcon={<SearchIcon />}
          onClick={goToQuery}
        >
          Query
        </Button>
        <Button
          variant="outline-primary"
          leftIcon={<Icon as={MdInput} boxSize="18px" />}
          onClick={goToExecute}
        >
          Execute
        </Button>
        <Flex>
          {contractInfo && (
            <EditContractDetails
              contractInfo={contractInfo}
              triggerElement={
                <IconButton
                  fontSize="22px"
                  variant="none"
                  aria-label="edit"
                  color="gray.600"
                  icon={<RiPencilFill />}
                />
              }
            />
          )}
          {renderSaveButton()}
        </Flex>
      </Flex>
    </Flex>
  );
};
