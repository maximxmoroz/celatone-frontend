import type { GridProps } from "@chakra-ui/react";
import { Flex, Text, Grid } from "@chakra-ui/react";

import { useInternalNavigate } from "lib/app-provider";
import { ExplorerLink } from "lib/components/ExplorerLink";
import { TableRow } from "lib/components/table";
import { ValidatorBadge } from "lib/components/ValidatorBadge";
import type { Block } from "lib/types";
import { dateFromNow, formatUTC, truncate } from "lib/utils";

interface BlocksTableRowProps {
  templateColumns: GridProps["templateColumns"];
  blockData: Block;
}

export const BlocksTableRow = ({
  templateColumns,
  blockData,
}: BlocksTableRowProps) => {
  const navigate = useInternalNavigate();

  const onRowSelect = (blockHeight: number) =>
    navigate({
      pathname: "/blocks/[blockHeight]",
      query: { blockHeight },
    });

  return (
    <Grid
      templateColumns={templateColumns}
      onClick={() => onRowSelect(blockData.height)}
      _hover={{ bg: "gray.900" }}
      transition="all 0.25s ease-in-out"
      cursor="pointer"
    >
      <TableRow>
        <ExplorerLink
          type="block_height"
          value={blockData.height.toString()}
          showCopyOnHover
        >
          {blockData.height}
        </ExplorerLink>
      </TableRow>
      <TableRow>{truncate(blockData.hash.toUpperCase())}</TableRow>
      <TableRow>
        <ValidatorBadge
          validator={blockData.proposer}
          badgeSize={7}
          maxWidth="220px"
        />
      </TableRow>
      <TableRow
        justifyContent="center"
        color={blockData.txCount === 0 ? "text.dark" : "text.main"}
      >
        {blockData.txCount}
      </TableRow>
      <TableRow>
        <Flex direction="column">
          <Text variant="body2" color="text.dark">
            {formatUTC(blockData.timestamp)}
          </Text>
          <Text variant="body3" color="text.disabled">
            ({dateFromNow(blockData.timestamp)})
          </Text>
        </Flex>
      </TableRow>
    </Grid>
  );
};
