import { Grid, Text } from "@chakra-ui/react";

import { useInternalNavigate } from "lib/app-provider";
import { ExplorerLink } from "lib/components/ExplorerLink";
import { TableRow } from "lib/components/table";
import type { PublicAccount } from "lib/types";

import { getNavigationArgs } from "./utils";

interface AccountTableRowProps {
  accountInfo: PublicAccount;
  templateColumns: string;
}

export const PublicProjectAccountRow = ({
  accountInfo,
  templateColumns,
}: AccountTableRowProps) => {
  const navigate = useInternalNavigate();
  const goToDetail = () => {
    navigate(getNavigationArgs(accountInfo));
  };

  return (
    <Grid
      templateColumns={templateColumns}
      onClick={goToDetail}
      _hover={{ bg: "gray.900" }}
      transition="all 0.25s ease-in-out"
      cursor="pointer"
      minW="min-content"
    >
      <TableRow>
        <ExplorerLink
          value={accountInfo.address.toString()}
          type={
            accountInfo.type === "account" ? "user_address" : "contract_address"
          }
          showCopyOnHover
        />
      </TableRow>
      <TableRow>{accountInfo.name}</TableRow>
      <TableRow>
        <Text variant="body2" color="text.dark" whiteSpace="break-spaces">
          {accountInfo.description || "N/A"}
        </Text>
      </TableRow>
    </Grid>
  );
};
