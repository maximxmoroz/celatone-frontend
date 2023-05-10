import { Flex, Text } from "@chakra-ui/react";

import type { MsgSwapExactAmountIn } from "../messages";
import { ExplorerLink } from "lib/components/ExplorerLink";
import type { AssetInfosOpt } from "lib/services/assetService";

import { PoolRoute, PoolSwap } from "./components";

interface MsgSwapExactAmountInDetailProps {
  txHash: string;
  blockHeight: number;
  msgIndex: number;
  msg: MsgSwapExactAmountIn;
  assetInfos: AssetInfosOpt;
  isOpened: boolean;
}

export const MsgSwapExactAmountInDetail = ({
  txHash,
  blockHeight,
  msgIndex,
  msg,
  assetInfos,
  isOpened,
}: MsgSwapExactAmountInDetailProps) => (
  <Flex w="full" alignItems="start" gap={12}>
    <Flex direction="column" minW="100px">
      <Text variant="body2" textColor="pebble.500" fontWeight={500}>
        Block height
      </Text>
      <ExplorerLink
        value={blockHeight.toString()}
        type="block_height"
        showCopyOnHover
      />
    </Flex>
    <Flex direction="column" gap={6}>
      <PoolSwap
        txHash={txHash}
        msgIndex={msgIndex}
        assetInfos={assetInfos}
        isOpened={isOpened}
      />
      <PoolRoute
        routes={msg.routes}
        assetInfos={assetInfos}
        isOpened={isOpened}
      />
    </Flex>
  </Flex>
);
