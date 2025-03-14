import { Grid, Box } from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";

import { useMobile } from "lib/app-provider";
import { TextInput } from "lib/components/forms";
import { EmptyState } from "lib/components/state";
import {
  MobileTableContainer,
  TableContainer,
  TableHeader,
  TableTitle,
  ViewMore,
} from "lib/components/table";
import { useContractStore } from "lib/providers/store";
import type { ContractLocalInfo } from "lib/stores/contract";
import type { PublicContract, Option, ContractAddr } from "lib/types";

import { PublicProjectContractMobileCard } from "./PublicProjectContractMobileCard";
import { PublicProjectContractRow } from "./PublicProjectContractRow";

export interface PublicContractInfo {
  localInfo: ContractLocalInfo;
  publicInfo: PublicContract;
}
interface PublicProjectContractTableProps {
  contracts: PublicContract[];
  onViewMore?: () => void;
}

const TEMPLATE_COLUMNS = "max(160px) minmax(300px, 1fr) max(200px) max(300px) ";

const ContractTableHeader = () => (
  <Grid templateColumns={TEMPLATE_COLUMNS} minW="min-content">
    <TableHeader>Contract Address</TableHeader>
    <TableHeader>Contract Name</TableHeader>
    <TableHeader>Instantiated By</TableHeader>
    <TableHeader />
  </Grid>
);

const ContentRender = ({
  publicContracts,
}: {
  publicContracts: PublicContractInfo[];
}) => {
  const isMobile = useMobile();
  return isMobile ? (
    <MobileTableContainer>
      {publicContracts.map((contract) => (
        <PublicProjectContractMobileCard
          key={contract.publicInfo.contractAddress}
          publicContractInfo={contract}
        />
      ))}
    </MobileTableContainer>
  ) : (
    <TableContainer>
      <ContractTableHeader />
      {publicContracts.map((contract) => (
        <PublicProjectContractRow
          key={contract.publicInfo.contractAddress}
          publicContractInfo={contract}
          templateColumns={TEMPLATE_COLUMNS}
        />
      ))}
    </TableContainer>
  );
};

export const PublicProjectContractTable = observer(
  ({ contracts = [], onViewMore }: PublicProjectContractTableProps) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const { getContractLocalInfo } = useContractStore();

    const filteredContracts = useMemo(() => {
      return onViewMore
        ? contracts.slice(0, 5)
        : matchSorter(contracts, searchKeyword, {
            keys: ["name", "contractAddress"],
            threshold: matchSorter.rankings.CONTAINS,
          });
    }, [contracts, onViewMore, searchKeyword]);

    const publicContracts: Option<PublicContractInfo[]> =
      filteredContracts?.map((contract) => ({
        localInfo: {
          contractAddress: contract.contractAddress as ContractAddr,
          instantiator: contract.instantiator,
          label: contract.label,
          ...getContractLocalInfo(contract.contractAddress),
        },
        publicInfo: {
          ...contract,
        },
      }));

    return (
      <Box mt={{ base: 8, md: 12 }} mb={4}>
        <TableTitle title="Contracts" count={contracts.length} />
        {!onViewMore && (
          <TextInput
            variant="fixed-floating"
            value={searchKeyword}
            setInputState={setSearchKeyword}
            placeholder="Search with Contract Address or Contract Name"
            size={{ base: "md", md: "lg" }}
            mb={6}
          />
        )}
        {publicContracts.length ? (
          <ContentRender publicContracts={publicContracts} />
        ) : (
          <EmptyState
            my={4}
            message={
              contracts.length
                ? "No matching contract found for this project. Make sure you are searching with Contract Address or Contract Name"
                : "There is currently no contracts related to this project."
            }
            imageVariant={onViewMore && "empty"}
            withBorder
          />
        )}
        {contracts.length > 5 && onViewMore && (
          <ViewMore onClick={onViewMore} />
        )}
      </Box>
    );
  }
);
