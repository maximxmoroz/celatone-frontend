import axios from "axios";

import type { Addr, AccessConfigPermission } from "lib/types";

export interface CodeIdInfoResponse {
  code_info: {
    code_id: string;
    creator: Addr;
    data_hash: string;
    instantiate_permission: {
      permission: AccessConfigPermission;
      address: Addr;
      addresses: Addr[];
    };
  };
  data: string;
}

export const getCodeIdInfo = async (
  endpoint: string,
  id: string
): Promise<CodeIdInfoResponse> => {
  const { data } = await axios.get<CodeIdInfoResponse>(
    `${endpoint}/cosmwasm/wasm/v1/code/${id}`
  );
  return data;
};
