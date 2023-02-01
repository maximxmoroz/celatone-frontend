import {
  Modal,
  ModalHeader,
  Flex,
  Icon,
  Box,
  Text,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useCallback } from "react";
import type { IconType } from "react-icons/lib";
import { MdMode } from "react-icons/md";

export interface ActionModalProps {
  icon?: IconType;
  iconColor?: string;
  title: string;
  subtitle?: string;
  headerContent?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  mainBtnTitle?: string;
  mainAction: () => void;
  mainVariant?: string;
  disabledMain?: boolean;
  otherBtnTitle?: string;
  otherAction?: () => void;
  otherVariant?: string;
  noHeaderBorder?: boolean;
  noCloseButton?: boolean;
}
export function ActionModal({
  icon = MdMode,
  iconColor = "pebble.600",
  title,
  subtitle,
  trigger,
  headerContent,
  children,
  mainBtnTitle = "Proceed",
  mainAction,
  mainVariant = "primary",
  disabledMain = false,
  otherBtnTitle = "Cancel",
  otherAction,
  otherVariant = "outline-primary",
  noHeaderBorder = false,
  noCloseButton = false,
}: ActionModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnMain = useCallback(() => {
    mainAction();
    onClose();
  }, [onClose, mainAction]);
  const handleOnOther = useCallback(() => {
    otherAction?.();
    onClose();
  }, [onClose, otherAction]);

  return (
    <>
      <Flex onClick={onOpen}>
        {trigger || <Button>Open {title} Modal</Button>}
      </Flex>
      <Modal isOpen={isOpen} onClose={handleOnOther} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            borderBottomWidth={noHeaderBorder ? 0 : 1}
            borderColor="pebble.700"
          >
            <Box w="full">
              <Flex alignItems="center" gap="3">
                <Icon as={icon} color={iconColor} boxSize="6" />
                {title}
              </Flex>
              {subtitle && (
                <Text variant="body3" color="text.dark" pt="2">
                  {subtitle}
                </Text>
              )}
              <Box>{headerContent}</Box>
            </Box>
          </ModalHeader>
          {!noCloseButton && <ModalCloseButton color="pebble.600" />}
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Flex w="full" justifyContent="center" gap="2">
              <Button
                w="200px"
                onClick={handleOnMain}
                variant={mainVariant}
                isDisabled={disabledMain}
              >
                {mainBtnTitle}
              </Button>
              <Button w="200px" variant={otherVariant} onClick={handleOnOther}>
                {otherBtnTitle}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
