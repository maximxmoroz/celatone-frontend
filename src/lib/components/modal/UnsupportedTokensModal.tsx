import {
  Modal,
  ModalHeader,
  Flex,
  Icon,
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import router from "next/router";
import { useCallback } from "react";
import { FaDollarSign } from "react-icons/fa";

import { Copier } from "../Copier";
import { ExplorerLink } from "../ExplorerLink";
import type { BalanceWithAssetInfo, Balance } from "lib/types";
import { getFirstQueryParam, tokenType, truncate } from "lib/utils";
import { formatToken } from "lib/utils/formatter/token";

interface UnsupportedTokensModalProps {
  unsupportedAssets: BalanceWithAssetInfo[];
}

interface UnsupportedTokenProps {
  balance: Balance;
}

const UnsupportedToken = ({ balance }: UnsupportedTokenProps) => {
  const splitId = balance.id.split("/");
  const type = !balance.id.includes("/")
    ? tokenType(balance.type)
    : tokenType(splitId[0]);
  if (splitId[1]) {
    splitId[1] = truncate(splitId[1]);
  }
  const label = () => (splitId.length === 1 ? balance.id : splitId.join("/"));

  return (
    <Flex borderRadius="8px" bg="gray.900" justify="space-between" p={4}>
      <Flex direction="column" maxW="70%">
        <Flex direction="row" role="group" alignItems="center">
          <Text variant="body2" className="ellipsis">
            {label()}
          </Text>
          <Box _groupHover={{ display: "flex" }} display="none">
            <Copier value={balance.id} />
          </Box>
        </Flex>
        <Text variant="body3" color="text.dark">
          {`${type} Token`}
        </Text>
      </Flex>
      <Text variant="body2" fontWeight="900">
        {formatToken(balance.amount, balance.precision)}
      </Text>
    </Flex>
  );
};

export const UnsupportedTokensModal = ({
  unsupportedAssets,
}: UnsupportedTokensModalProps) => {
  const contractAddress = getFirstQueryParam(router.query.contractAddress);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnOther = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      <Flex onClick={onOpen}>
        <Button variant="ghost" color="text.dark" mb={1} fontWeight={500}>
          {`View ${unsupportedAssets.length} Unsupported Assets`}
        </Button>{" "}
      </Flex>
      <Modal isOpen={isOpen} onClose={handleOnOther} isCentered>
        <ModalOverlay />
        <ModalContent w="560px">
          <ModalHeader>
            <Flex
              w="full"
              direction="row"
              alignItems="center"
              gap={2}
              pl={2}
              pt={1}
            >
              <Icon as={FaDollarSign} boxSize={5} color="gray.600" />
              <Heading variant="h5" as="h5">
                Unsupported Assets
              </Heading>
            </Flex>
          </ModalHeader>

          <ModalCloseButton color="gray.600" />
          <ModalBody maxH="400px" overflow="overlay">
            <Flex direction="column" gap={5}>
              <Flex direction="row" gap={4}>
                <Text variant="body2" fontWeight="700">
                  Contract Address
                </Text>
                <ExplorerLink value={contractAddress} type="contract_address" />
              </Flex>
              <Flex gap={2} direction="column">
                {unsupportedAssets.map((asset) => (
                  <UnsupportedToken balance={asset.balance} />
                ))}
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
