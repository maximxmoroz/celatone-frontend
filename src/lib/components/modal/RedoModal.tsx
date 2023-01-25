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
  ModalFooter,
} from "@chakra-ui/react";
import { useWallet } from "@cosmos-kit/react";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { MdReplay } from "react-icons/md";

import { useRedo } from "lib/pages/past-txs/hooks/useRedo";
import type { Message } from "lib/types";
import { extractMsgType } from "lib/utils";

interface RedoModalProps {
  message: Message;
}

export const RedoModal = ({ message }: RedoModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickRedo = useRedo();
  const { currentChainName } = useWallet();

  return (
    <>
      <Flex onClick={onOpen}>
        <Button
          leftIcon={<BsArrowCounterclockwise />}
          variant="outline"
          iconSpacing="2"
          size="sm"
        >
          Redo
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="450px">
          <ModalHeader>
            <Flex w="full" direction="row" alignItems="center" gap={2} pt={1}>
              <Icon as={MdReplay} boxSize={6} color="gray.600" />
              <Heading variant="h5" as="h5">
                Redo Instantiate
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="gray.600" />
          <ModalBody maxH="400px" overflow="overlay">
            <Flex direction="column" gap={5}>
              <Flex direction="row" gap={4}>
                <Text variant="body1">
                  This contract was instantiated through{" "}
                  <span style={{ fontWeight: 700 }}>
                    &#x2018;Instantiate2&#x2019;
                  </span>
                  , which our app does not currently support. You can instead
                  instantiate the contract using{" "}
                  <span style={{ fontWeight: 700 }}>
                    &#x2018;MsgInstantiateContract&#x2019;
                  </span>{" "}
                  for the time being
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex
              w="full"
              direction="row"
              align="center"
              justifyContent="center"
              gap="4"
            >
              <Button
                onClick={(e) =>
                  onClickRedo(
                    e,
                    extractMsgType(message.type),
                    message.msg,
                    currentChainName
                  )
                }
              >{`Redo with \u2018MsgInstantiateContract\u2019`}</Button>
              <Text
                cursor="pointer"
                onClick={onClose}
                color="primary.main"
                variant="body2"
                fontWeight="700"
              >
                Cancel
              </Text>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
