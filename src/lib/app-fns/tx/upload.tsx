import type { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import type { DeliverTxResponse, logs, StdFee } from "@cosmjs/stargate";
import { pipe } from "@rx-stream/pipe";
import type { Observable } from "rxjs";

import type { UploadSucceedCallback } from "lib/app-provider";
import { ExplorerLink } from "lib/components/ExplorerLink";
import { CustomIcon } from "lib/components/icon";
import { TxStreamPhase } from "lib/types";
import type { HumanAddr, TxResultRendering, ComposedMsg } from "lib/types";
import { findAttr } from "lib/utils";
import { formatUFee } from "lib/utils/formatter/denom";

import { catchTxError } from "./common";
import { postTx } from "./common/post";
import { sendingTx } from "./common/sending";

interface UploadTxParams {
  address: HumanAddr;
  codeName: string;
  messages: ComposedMsg[];
  wasmFileName: string;
  fee: StdFee;
  memo?: string;
  client: SigningCosmWasmClient;
  isMigrate: boolean;
  onTxSucceed: UploadSucceedCallback;
}

export const uploadContractTx = ({
  address,
  codeName,
  messages,
  wasmFileName,
  fee,
  memo,
  client,
  isMigrate,
  onTxSucceed,
}: UploadTxParams): Observable<TxResultRendering> => {
  return pipe(
    sendingTx(fee),
    postTx<DeliverTxResponse>({
      postFn: () => client.signAndBroadcast(address, messages, fee, memo),
    }),
    ({ value: txInfo }) => {
      const mimicLog: logs.Log = {
        msg_index: 0,
        log: "",
        events: txInfo.events,
      };

      const codeId = findAttr(mimicLog, "store_code", "code_id") ?? "0";
      const codeHash = findAttr(mimicLog, "store_code", "code_checksum") ?? "";
      const txFee = txInfo.events.find((e) => e.type === "tx")?.attributes[0]
        .value;
      const formattedFee = txFee ? formatUFee(txFee) : "N/A";

      onTxSucceed({
        codeId: parseInt(codeId, 10).toString(),
        codeHash,
        codeDisplayName: codeName || `${wasmFileName}(${codeId})`,
        txHash: txInfo.transactionHash,
        formattedFee,
      });

      return isMigrate
        ? ({
            value: null,
            phase: TxStreamPhase.SUCCEED,
            receipts: [
              {
                title: "Code ID",
                value: codeId,
                html: (
                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <ExplorerLink type="code_id" value={codeId} openNewTab />
                  </div>
                ),
              },
              {
                title: "Tx Hash",
                value: txInfo.transactionHash,
                html: (
                  <ExplorerLink
                    type="tx_hash"
                    value={txInfo.transactionHash}
                    openNewTab
                  />
                ),
              },
              {
                title: "Tx Fee",
                value: formattedFee,
              },
            ],
            receiptInfo: {
              header: "Upload Wasm Complete!",
              description: (
                <>
                  <span style={{ fontWeight: 700 }}>
                    ‘{codeName || `${wasmFileName}(${codeId})`}’
                  </span>{" "}
                  is has been uploaded. Would you like to migrate your code now?
                </>
              ),
              headerIcon: (
                <CustomIcon name="upload-cloud" boxSize={5} color="gray.600" />
              ),
            },
            actionVariant: "upload-migrate",
          } as TxResultRendering)
        : // TODO: this is type hack
          (null as unknown as TxResultRendering);
    }
  )().pipe(catchTxError());
};
