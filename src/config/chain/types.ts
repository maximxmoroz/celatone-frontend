import type { MainWalletBase } from "@cosmos-kit/core";

type FaucetConfig =
  | {
      enabled: true;
      url: string;
    }
  | { enabled: false };

type WasmConfig =
  | {
      enabled: true;
      storeCodeMaxFileSize: number;
      clearAdminGas: number;
    }
  | {
      enabled: false;
    };

type MoveConfig =
  | { enabled: true; moduleMaxFileSize: number; decodeApi: string }
  | { enabled: false };

type PoolConfig =
  | {
      enabled: true;
      url: string;
    }
  | { enabled: false };

type PublicProjectConfig = { enabled: boolean };

type GovConfig =
  | {
      enabled: true;
      hideOpenProposal?: boolean;
      disableWhitelistProposal?: boolean;
      disableStoreCodeProposal?: boolean;
    }
  | {
      enabled: false;
    };

type NftConfig = { enabled: boolean };

export interface ExplorerConfig {
  validator: string;
  proposal: string;
}

export interface ChainConfig {
  chain: string;
  registryChainName: string;
  prettyName: string;
  lcd: string;
  rpc: string;
  indexer: string;
  wallets: MainWalletBase[];
  features: {
    faucet: FaucetConfig;
    wasm: WasmConfig;
    move: MoveConfig;
    pool: PoolConfig;
    publicProject: PublicProjectConfig;
    gov: GovConfig;
    nft: NftConfig;
  };
  gas: {
    gasPrice: {
      tokenPerGas: number;
      denom: string;
    };
    gasAdjustment: number;
    maxGasLimit: number;
  };
  explorerLink: ExplorerConfig;
  extra: {
    disableAnyOfAddresses?: boolean;
    disableDelegation?: boolean;
  };
}

export interface ChainConfigs {
  [chainId: string]: ChainConfig;
}
