import { wallets as keplrWallets } from "@cosmos-kit/keplr";

import type { ChainConfigs } from "./types";

export const LOCALBOSTROM_CHAIN_CONFIGS: ChainConfigs = {
  localbostrom: {
    chain: "localbostrom",
    registryChainName: "localbostrom",
    prettyName: "Local Bostrom",
    lcd: "https://localhost:1317",
    rpc: "https://localhost:26657",
    indexer: "https://localhost:8090/v1/graphql",
    wallets: [...keplrWallets],
    features: {
      faucet: {
        enabled: true,
        url: "http://localhost:5005/request",
      },
      wasm: {
        enabled: true,
        storeCodeMaxFileSize: 800_000,
        clearAdminGas: 50_000,
      },
      move: {
        enabled: false,
      },
      pool: {
        enabled: false,
      },
      publicProject: {
        enabled: false,
      },
      gov: {
        enabled: true,
        disableWhitelistProposal: true,
        disableStoreCodeProposal: true,
      },
      nft: {
        enabled: false,
      },
    },
    gas: {
      gasPrice: {
        tokenPerGas: 0.25,
        denom: "boot",
      },
      gasAdjustment: 1.5,
      maxGasLimit: 25_000_000,
    },
    explorerLink: {
      validator: "",
      proposal: "",
    },
    extra: {},
  },
};
