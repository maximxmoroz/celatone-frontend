import { Flex, Text, Heading, Spinner } from "@chakra-ui/react";

import type { Option, TokenWithValue } from "lib/types";
import {
  formatPrice,
  formatUTokenWithPrecision,
  getTokenLabel,
} from "lib/utils";

interface SingleBondRadioCardProps {
  value: string;
  token: Option<TokenWithValue>;
  isLoading: boolean;
}

const SingleBondRadioCardBody = ({
  token,
  isLoading,
}: Omit<SingleBondRadioCardProps, "value">) => {
  if (isLoading) return <Spinner mt={2} alignSelf="center" size="xl" />;
  if (!token)
    return (
      <Heading variant="h6" as="h6">
        N/A
      </Heading>
    );

  return (
    <Flex alignItems="end" gap={1}>
      <Heading variant="h6" as="h6">
        {formatUTokenWithPrecision(token.amount, token.precision ?? 0)}
      </Heading>
      <Text variant="body2" textColor="text.main">
        {getTokenLabel(token.denom, token.symbol)}
      </Text>
    </Flex>
  );
};

export const SingleBondRadioCard = ({
  value,
  token,
  isLoading,
}: SingleBondRadioCardProps) => (
  <Flex alignItems="center" gap={2} justifyContent="space-between">
    <Flex direction="column" gap={1}>
      <Text variant="body2" textColor="gray.400" fontWeight={500}>
        {value}
      </Text>
      <SingleBondRadioCardBody token={token} isLoading={isLoading} />
    </Flex>
    <Text variant="body2" textColor="text.dark">
      ({token?.value ? formatPrice(token.value) : "-"})
    </Text>
  </Flex>
);
