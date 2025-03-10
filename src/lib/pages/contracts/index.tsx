import { Heading, Box, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AmpEvent, track } from "lib/amplitude";
import { useInternalNavigate, useWasmConfig } from "lib/app-provider";
import PageContainer from "lib/components/PageContainer";
import { EmptyState } from "lib/components/state";
import { ContractsTable } from "lib/components/table";
import type { ContractAddr } from "lib/types";

import { useRecentContractsData } from "./data";

const RecentContracts = observer(() => {
  useWasmConfig({ shouldRedirect: true });
  const router = useRouter();
  const navigate = useInternalNavigate();
  const onRowSelect = (contract: ContractAddr) =>
    navigate({
      pathname: "/contracts/[contract]",
      query: { contract },
    });

  const { recentContracts, isLoading } = useRecentContractsData("");

  useEffect(() => {
    if (router.isReady) track(AmpEvent.TO_RECENT_CONTRACT);
  }, [router.isReady]);

  return (
    <PageContainer>
      <Box>
        <Heading variant="h5" as="h5" minH="36px">
          Recent Contracts
        </Heading>
        <Text variant="body2" color="text.dark" fontWeight={500} mb={8}>
          Showing the 100 most recent instantiated contracts on this network
        </Text>
      </Box>
      <ContractsTable
        contracts={recentContracts}
        isLoading={isLoading}
        emptyState={
          <EmptyState
            imageVariant="empty"
            message="Most recent 100 contracts will display here."
            withBorder
          />
        }
        onRowSelect={onRowSelect}
        withoutTag
      />
    </PageContainer>
  );
});

export default RecentContracts;
