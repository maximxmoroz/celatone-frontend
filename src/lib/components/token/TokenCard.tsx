import type { FlexProps } from "@chakra-ui/react";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { isUndefined } from "lodash";

import { Copier } from "../copy";
import { Tooltip } from "../Tooltip";
import type { TokenWithValue } from "lib/types";
import {
  formatPrice,
  formatUTokenWithPrecision,
  getTokenLabel,
} from "lib/utils";

import { TokenImageRender } from "./TokenImageRender";

interface TokenCardProps extends FlexProps {
  token: TokenWithValue;
  amptrackSection?: string;
}

export const TokenCard = ({
  token,
  amptrackSection,
  ...cardProps
}: TokenCardProps) => (
  <Tooltip label={`Token ID: ${token.denom}`} maxW="240px" textAlign="center">
    <Flex
      className="copier-wrapper"
      direction="column"
      minH="101px"
      gap={2}
      p={3}
      background="gray.900"
      borderRadius="8px"
      {...cardProps}
    >
      <Flex
        gap={1}
        alignItems="center"
        borderBottom="1px solid"
        borderBottomColor="gray.700"
        pb={2}
      >
        <TokenImageRender
          logo={token.logo}
          alt={getTokenLabel(token.denom, token.symbol)}
          boxSize={6}
        />
        <Text variant="body2" className="ellipsis" maxW="91" fontWeight="bold">
          {token.symbol}
        </Text>
        <Badge variant="gray" ml={2}>
          {!isUndefined(token.price) ? formatPrice(token.price) : "N/A"}
        </Badge>
        <Copier
          type={
            !isUndefined(token.price) ? "supported_asset" : "unsupported_asset"
          }
          value={token.denom}
          copyLabel="Token ID Copied!"
          display={{ base: "flex", md: "none" }}
          ml={1}
          amptrackSection={amptrackSection}
        />
      </Flex>

      <Flex direction="column">
        <Text fontWeight={700} variant="body2">
          {formatUTokenWithPrecision(token.amount, token.precision ?? 0, false)}
        </Text>
        <Text variant="body3" color="text.dark">
          {!isUndefined(token.value) ? `(${formatPrice(token.value)})` : "N/A"}
        </Text>
      </Flex>
    </Flex>
  </Tooltip>
);
