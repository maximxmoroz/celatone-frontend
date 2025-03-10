import { useRouter } from "next/router";
import { useEffect } from "react";

import { AmpEvent, track } from "lib/amplitude";
import { Breadcrumb } from "lib/components/Breadcrumb";
import { Loading } from "lib/components/Loading";
import PageContainer from "lib/components/PageContainer";
import { EmptyState } from "lib/components/state";
import { useBlockInfoQuery } from "lib/services/blockService";
import { getFirstQueryParam } from "lib/utils";

import { BlockDetailsTop, BlockInfo, BlockTxsTable } from "./components";

const BlockDetail = () => {
  const router = useRouter();
  const heightParam = getFirstQueryParam(router.query.height);
  const { data: blockData, isLoading } = useBlockInfoQuery(heightParam);

  useEffect(() => {
    if (router.isReady) track(AmpEvent.TO_BLOCK_DETAIL);
  }, [router.isReady]);

  if (isLoading) return <Loading withBorder />;

  return (
    <PageContainer>
      <Breadcrumb
        items={[
          { text: "Blocks", href: "/blocks" },
          { text: blockData?.height.toString() },
        ]}
      />
      {blockData ? (
        <>
          <BlockDetailsTop blockData={blockData} />
          <BlockInfo blockData={blockData} />
          <BlockTxsTable height={Number(heightParam)} />
        </>
      ) : (
        <EmptyState
          imageVariant="not-found"
          heading="Block does not exist"
          message="Please check your input or make sure you have selected the correct network."
          withBorder
        />
      )}
    </PageContainer>
  );
};

export default BlockDetail;
