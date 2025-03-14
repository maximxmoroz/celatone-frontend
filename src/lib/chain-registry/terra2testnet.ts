import type { Chain, AssetList } from "@chain-registry/types";

export const terra2testnet: Chain = {
  $schema: "../../chain.schema.json",
  chain_name: "terra2testnet",
  status: "live",
  network_type: "testnet",
  website: "https://www.terra.money/",
  pretty_name: "Terra 2.0 Testnet",
  chain_id: "pisco-1",
  daemon_name: "terrad",
  node_home: "$HOME/.terra",
  bech32_prefix: "terra",
  slip44: 330,
  fees: {
    fee_tokens: [
      {
        denom: "uluna",
        fixed_min_gas_price: 0.125,
        low_gas_price: 0.125,
        average_gas_price: 0.15,
        high_gas_price: 0.4,
      },
    ],
  },
  staking: {
    staking_tokens: [
      {
        denom: "uluna",
      },
    ],
  },
  peers: {
    seeds: [
      {
        id: "3bfc40d3d7f14b59c5943bf2d45ce103d42174c5",
        address: "seed-terra-testnet.moonshot.army:26655",
        provider: "Moonshot Army",
      },
      {
        id: "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0",
        address: "testnet-seeds.polkachu.com:11756",
        provider: "Polkachu",
      },
    ],
    persistent_peers: [
      {
        id: "0d194f5236a420147b05d9556ac0cf928c36e647",
        address: "65.109.23.114:11756",
        provider: "Polkachu",
      },
      {
        id: "5cc5e6506818a113387d92e0b60a7206845b4d7e",
        address: "pisco-1-sentinel.skip.money:26656",
        provider: "Skip.Money",
      },
    ],
  },
  apis: {
    rpc: [
      {
        address: "https://pisco-rpc.terra.dev:443",
        provider: "Terraform Labs",
      },
      {
        address: "https://terra-testnet-rpc.polkachu.com:443",
        provider: "Polkachu",
      },
    ],
    rest: [
      {
        address: "https://pisco-lcd.terra.dev:443",
        provider: "Terraform Labs",
      },
      {
        address: "https://terra-testnet-api.polkachu.com:443",
        provider: "Polkachu",
      },
    ],
    grpc: [
      {
        address: "terra-testnet-grpc.polkachu.com:11790",
        provider: "Polkachu",
      },
    ],
  },
  explorers: [
    {
      kind: "finder",
      url: "http://finder.terra.money/testnet/",
    },
  ],
};

export const terra2testnetAssets: AssetList = {
  $schema: "../../assetlist.schema.json",
  chain_name: "terra2testnet",
  assets: [
    {
      description: "The native staking token of Terra.",
      denom_units: [
        {
          denom: "uluna",
          exponent: 0,
        },
        {
          denom: "luna",
          exponent: 6,
        },
      ],
      base: "uluna",
      name: "Luna",
      display: "luna",
      symbol: "LUNA",
      logo_URIs: {
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.svg",
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra2/images/luna.png",
      },
      coingecko_id: "terra-luna-2",
    },
  ],
};
