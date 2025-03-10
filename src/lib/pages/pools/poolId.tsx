import { useRouter } from "next/router";
import { useEffect } from "react";

import { AmpEvent, track } from "lib/amplitude";
import { useInternalNavigate } from "lib/app-provider";
import { Loading } from "lib/components/Loading";
import PageContainer from "lib/components/PageContainer";
import { getFirstQueryParam } from "lib/utils";

import {
  PoolTopSection,
  PoolAssets,
  PoolRelatedTxs,
} from "./components/pool-details";
import { usePool } from "./data";

export const PoolId = () => {
  const router = useRouter();
  const navigate = useInternalNavigate();
  const poolId = Number(getFirstQueryParam(router.query.poolId));
  const { pool, isLoading } = usePool(poolId);

  useEffect(() => {
    if (router.isReady) track(AmpEvent.TO_POOL_DETAIL);
  }, [router.isReady]);

  if (isLoading) return <Loading />;
  if (!pool) return navigate({ pathname: `/pools` });
  return (
    <PageContainer>
      <PoolTopSection pool={pool} />
      <PoolAssets pool={pool} />
      <PoolRelatedTxs pool={pool} />
    </PageContainer>
  );
};
