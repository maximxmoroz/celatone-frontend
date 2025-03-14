import { Flex } from "@chakra-ui/react";
import plur from "plur";

import { useGetAddressType } from "lib/app-provider";
import { TxReceiptRender } from "lib/components/tx";
import type { TxReceipt } from "lib/types";

import type { TxMsgData } from ".";
import { EventBox } from "./EventBox";
import { generateReceipts } from "./msg-receipts";

interface TxMsgDetailsProps extends TxMsgData {
  isExpand: boolean;
}

export const TxMsgDetails = ({
  isExpand,
  assetInfos,
  ...txMsgData
}: TxMsgDetailsProps) => {
  const getAddressType = useGetAddressType();
  const receipts = generateReceipts(txMsgData, getAddressType, assetInfos)
    .concat(
      txMsgData.log && {
        title: plur("Event Log", txMsgData.log.events.length),
        html: (
          <Flex direction="column" gap={3} w="full">
            {txMsgData.log.events.map((event, idx) => (
              <EventBox
                key={
                  idx.toString() + event.type + JSON.stringify(event.attributes)
                }
                event={event}
                msgIndex={idx}
              />
            ))}
          </Flex>
        ),
      }
    )
    .filter(Boolean) as TxReceipt[];

  return (
    <Flex
      direction="column"
      gap={6}
      pt={4}
      height={isExpand ? "full" : 0}
      overflow="hidden"
      transition="all 0.25s ease-in-out"
    >
      <TxReceiptRender
        variant="tx-page"
        receipts={receipts}
        gap={{ base: 4, md: 3 }}
      />
    </Flex>
  );
};
