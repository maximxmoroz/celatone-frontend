import { parseCoins, type Coin } from "@cosmjs/stargate";

import type { Token, Option } from "lib/types";

import { exponentify } from "./formatter";

export const sortDenoms = (assets: Coin[]): Coin[] =>
  assets.sort(({ denom: aDenom }, { denom: bDenom }) =>
    aDenom.localeCompare(bDenom, undefined, { sensitivity: "base" })
  );

interface CoinWithPrecision extends Coin {
  precision: Option<number>;
}

export const fabricateFunds = (assets: CoinWithPrecision[]): Coin[] =>
  sortDenoms(
    assets
      .filter((asset) => Number(asset.amount) && asset.denom)
      .map((asset) => ({
        denom: asset.denom,
        amount: exponentify(asset.amount as Token, asset.precision).toFixed(0),
      }))
  );

export const coinsFromStr = (str: string): Coin[] => {
  try {
    return parseCoins(str);
  } catch {
    return [];
  }
};

export const coinsToStr = (coins: Coin[]): string =>
  coins.map((coin) => `${coin.amount}${coin.denom}`).toString();
