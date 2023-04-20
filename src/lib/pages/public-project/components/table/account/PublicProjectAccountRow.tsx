import { Grid, Text } from "@chakra-ui/react";

import { useInternalNavigate } from "lib/app-provider";
import { ExplorerLink } from "lib/components/ExplorerLink";
import { TableRow } from "lib/components/table";
import type { Account } from "lib/types";

interface AccountTableRowProps {
  accountInfo: Account;
  templateColumns: string;
}

export const PublicProjectAccountRow = ({
  accountInfo,
  templateColumns,
}: AccountTableRowProps) => {
  const navigate = useInternalNavigate();
  const goToAccountDetail = () => {
    navigate({
      pathname: `/account/${accountInfo.address}`,
    });
  };

  return (
    <Grid
      templateColumns={templateColumns}
      onClick={goToAccountDetail}
      _hover={{ bg: "pebble.900" }}
      transition="all .25s ease-in-out"
      cursor="pointer"
      minW="min-content"
    >
      <TableRow>
        <ExplorerLink
          value={accountInfo.address.toString()}
          type="user_address"
          showCopyOnHover
        />
      </TableRow>
      <TableRow>
        <Text>{accountInfo.name}</Text>
      </TableRow>
      <TableRow>
        <Text variant="body2" color="text.dark" whiteSpace="break-spaces">
          {accountInfo.description || "N/A"}
        </Text>
      </TableRow>
    </Grid>
  );
};
