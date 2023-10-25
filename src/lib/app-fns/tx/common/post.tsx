import type {
  DeliverTxResponse,
  ExecuteResult,
  InstantiateResult,
  UploadResult,
} from "@cosmjs/cosmwasm-stargate";
import { isDeliverTxFailure } from "@cosmjs/stargate";

import { ExplorerLink } from "lib/components/ExplorerLink";
import type { TxResultRendering } from "lib/types";
import { TxStreamPhase } from "lib/types";
import { formatUFee } from "lib/utils/formatter/denom";

// TODO: We'll use only DeliverTxResponse later.
type TxResult =
  | UploadResult
  | InstantiateResult
  | ExecuteResult
  | DeliverTxResponse;

interface PostTxParams<T extends TxResult> {
  postFn: () => Promise<T>;
}

// TODO: remove later. We'll throw an error with transactionHash.
function createDeliverTxResponseErrorMessage(
  result: DeliverTxResponse
): string {
  return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

export const postTx = <T extends TxResult>({ postFn }: PostTxParams<T>) => {
  return () =>
    postFn().then(
      // NOTE: only shown if there is a wait for the next step
      // currently not appearing since next step is already a success
      (txResult) => {
        if ("code" in txResult && isDeliverTxFailure(txResult)) {
          throw new Error(createDeliverTxResponseErrorMessage(txResult));
        }

        return {
          value: txResult,
          phase: TxStreamPhase.BROADCAST,
          receipts: [
            {
              title: "Tx Hash",
              html: (
                <ExplorerLink
                  type="tx_hash"
                  value={txResult.transactionHash}
                  openNewTab
                />
              ),
            },
            {
              title: "Tx Fee",
              // TODO: Implement event/rawlog attribute picker
              value: `${formatUFee(
                txResult.events.find((e) => e.type === "tx")?.attributes[0]
                  .value ?? "0"
              )}`,
            },
          ],
          receiptInfo: {
            header: "Sending Transaction",
          },
          actionVariant: "sending",
        } as TxResultRendering<T>;
      }
    );
};
