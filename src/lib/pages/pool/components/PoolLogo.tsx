import { Flex, Image } from "@chakra-ui/react";

import { getUndefinedTokenIcon } from "../utils";
import { useAssetInfos } from "lib/services/assetService";
import type { PoolDetail } from "lib/types/pool";

interface PoolLogoProps {
  poolLiquidity: PoolDetail["poolLiquidity"];
}
export const PoolLogo = ({ poolLiquidity }: PoolLogoProps) => {
  const { assetInfos } = useAssetInfos();

  return (
    <Flex
      css={{
        ">:not(:first-child)": {
          marginLeft: "-12px",
        },
      }}
      width="96px"
      alignItems="center"
      justifyContent="center"
    >
      {poolLiquidity.length > 3 ? (
        <>
          {poolLiquidity.slice(0, 2).map((item, i) => (
            <Image
              boxSize={10}
              src={
                assetInfos?.[item.denom]?.logo ||
                getUndefinedTokenIcon(item.denom)
              }
              zIndex={i * -1 + 2}
            />
          ))}
          <Flex
            width={10}
            height={10}
            borderRadius="full"
            backgroundColor="pebble.700"
            alignItems="center"
            justifyContent="center"
          >
            +{poolLiquidity.length - 2}
          </Flex>
        </>
      ) : (
        poolLiquidity.map((asset, i) => (
          <Image
            boxSize={10}
            src={
              assetInfos?.[asset.denom]?.logo ||
              getUndefinedTokenIcon(asset.denom)
            }
            zIndex={i * -1 + 2}
          />
        ))
      )}
    </Flex>
  );
};
