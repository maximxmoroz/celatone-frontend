import { useState } from "react";

import type { UploadTxInternalResult } from "lib/app-provider";
import { useWasmConfig } from "lib/app-provider";
import { scrollToTop } from "lib/utils";

import { UploadComplete } from "./completed";
import { Upload } from "./upload";

const UploadIndex = () => {
  useWasmConfig({ shouldRedirect: true });
  const [txInfo, setTxInfo] = useState<UploadTxInternalResult>({
    codeDisplayName: "",
    codeId: "",
    codeHash: "",
    txHash: "",
    formattedFee: "",
  });

  const [completed, setCompleted] = useState(false);

  return completed ? (
    <UploadComplete txResult={txInfo} />
  ) : (
    <Upload
      onComplete={(txResult: UploadTxInternalResult) => {
        setTxInfo(txResult);
        setCompleted(true);
        scrollToTop();
      }}
    />
  );
};

export default UploadIndex;
