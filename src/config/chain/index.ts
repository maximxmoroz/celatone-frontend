import { INITIA_CHAIN_CONFIGS } from "./initia";
import { LOCALBOSTROM_CHAIN_CONFIGS } from "./localbostrom";
import { NEUTRON_CHAIN_CONFIGS } from "./neutron";
import { OSMOSIS_CHAIN_CONFIGS } from "./osmosis";
import { SEI_CHAIN_CONFIGS } from "./sei";
import { STARGAZE_CHAIN_CONFIGS } from "./stargaze";
import { TERRA_CHAIN_CONFIGS } from "./terra";
import type { ChainConfigs } from "./types";

export * from "./types";
export * from "./default";

export const CHAIN_CONFIGS: ChainConfigs = {
  ...OSMOSIS_CHAIN_CONFIGS,
  ...SEI_CHAIN_CONFIGS,
  ...NEUTRON_CHAIN_CONFIGS,
  ...STARGAZE_CHAIN_CONFIGS,
  ...TERRA_CHAIN_CONFIGS,
  ...INITIA_CHAIN_CONFIGS,
  ...LOCALBOSTROM_CHAIN_CONFIGS,
};
