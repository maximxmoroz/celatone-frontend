import type { Chain, AssetList } from "@chain-registry/types";

export const localbostrom: Chain = {
  $schema: "../chain.schema.json",
  chain_name: "localbostrom",
  status: "live",
  network_type: "testnet",
  pretty_name: "localbostrom",
  chain_id: "localbostrom",
  bech32_prefix: "boot",
  daemon_name: "localbostrom",
  node_home: "/root/localbostrom",
  key_algos: ["secp256k1"],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        denom: "boot",
        fixed_min_gas_price: 0.025,
        low_gas_price: 0.025,
        average_gas_price: 0.025,
        high_gas_price: 0.025,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "boot",
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: "https://localhost/rpc",
      },
    ],
    rest: [
      {
        address: "https://localhost/rest",
      },
    ],
  },
  logo_URIs: {
    png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmosis-chain-logo.png",
  },
  keywords: ["testnet"],
};

export const localbostromAsset: AssetList = {
  $schema: "../assetlist.schema.json",
  chain_name: "localbostrom",
  assets: [
    {
      description: "The native token of Bostrom",
      denom_units: [
        {
          denom: "boot",
          exponent: 0,
          aliases: [],
        },
        {
          denom: "boot",
          exponent: 6,
          aliases: [],
        },
      ],
      base: "boot",
      name: "Bostrom",
      display: "boot",
      symbol: "BOOT",
      logo_URIs: {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
      },
      coingecko_id: "bostrom",
      keywords: ["dex", "staking"],
    },
  ],
};
