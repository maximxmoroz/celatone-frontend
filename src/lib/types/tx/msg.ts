import type { Coin } from "@cosmjs/stargate";
import type { MsgSubmitProposal } from "cosmjs-types/cosmos/gov/v1beta1/tx";

import type { Addr, ContractAddr } from "../addrs";

export enum MsgType {
  STORE_CODE = "STORE_CODE",
  INSTANTIATE = "INSTANTIATE",
  EXECUTE = "EXECUTE",
  MIGRATE = "MIGRATE",
  UPDATE_ADMIN = "UPDATE_ADMIN",
  SUBMIT_PROPOSAL = "SUBMIT_PROPOSAL",
}

export enum AccessType {
  ACCESS_TYPE_UNSPECIFIED = 0,
  ACCESS_TYPE_NOBODY = 1,
  ACCESS_TYPE_ONLY_ADDRESS = 2,
  ACCESS_TYPE_EVERYBODY = 3,
  ACCESS_TYPE_ANY_OF_ADDRESSES = 4,
  UNRECOGNIZED = -1,
}

export interface AccessConfig {
  permission: AccessType;
  address: Addr;
  addresses?: Addr[];
}

export interface MsgStoreCode {
  sender: Addr;
  wasmByteCode: Uint8Array;
  instantiatePermission?: AccessConfig;
}

export interface MsgInstantiateContract {
  sender: Addr;
  admin: Addr;
  codeId: Long;
  label: string;
  msg: Uint8Array;
  funds: Coin[];
}

export interface MsgExecuteContract {
  sender: Addr;
  contract: ContractAddr;
  msg: Uint8Array;
  funds: Coin[];
}

export interface MsgMigrateContract {
  sender: Addr;
  contract: ContractAddr;
  codeId: Long;
  msg: Uint8Array;
}
export interface MsgUpdateAdmin {
  sender: Addr;
  newAdmin: Addr;
  contract: ContractAddr;
}

export type TxMessage =
  | MsgStoreCode
  | MsgInstantiateContract
  | MsgExecuteContract
  | MsgMigrateContract
  | MsgUpdateAdmin
  | MsgSubmitProposal;

export interface ComposedMsg {
  typeUrl: string;
  value: TxMessage;
}

export interface DetailExecute extends MsgExecuteContract {
  msgJSON: string;
}

export interface DetailInstantiate extends MsgInstantiateContract {
  contractAddress: ContractAddr;
}

export interface DetailSend {
  amount: Coin[];
  fromAddress: Addr;
  toAddress: Addr;
}
export interface DetailUpload {
  id: number;
  sender: Addr;
}

export interface DetailClearAdmin {
  contract: ContractAddr;
  sender: Addr;
}

export interface DetailUpdateAdmin {
  contract: ContractAddr;
  newAdmin: Addr;
  sender: Addr;
}

export interface DetailMigrate {
  codeId: number;
  contract: ContractAddr;
  msg: object;
  sender: Addr;
}
