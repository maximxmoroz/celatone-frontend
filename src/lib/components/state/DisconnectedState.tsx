import { Flex, Text } from "@chakra-ui/react";

import { ConnectWalletBtn } from "../button/ConnectWallet";

import { StateImage } from "./StateImage";

interface DisconnectedStateProps {
  text: string;
  helperText?: string;
}

export const DisconnectedState = ({
  text,
  helperText,
}: DisconnectedStateProps) => (
  <Flex direction="column" alignItems="center" gap={4}>
    <StateImage imageVariant="disconnected" />
    <Flex align="center" justify="center">
      <ConnectWalletBtn />
      <Text variant="body1" color="text.dark" ml={2}>
        {text}
      </Text>
    </Flex>
    {helperText && (
      <Text
        variant="body1"
        color="text.dark"
        textAlign="center"
        mt={4}
        maxW="520px"
        alignSelf="center"
      >
        {helperText}
      </Text>
    )}
  </Flex>
);
