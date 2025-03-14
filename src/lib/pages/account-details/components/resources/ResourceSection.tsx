import { Flex } from "@chakra-ui/react";

import { TableTitle } from "lib/components/table";
import type { HumanAddr, ResourceGroupByAccount, Option } from "lib/types";

import { ResourceSectionBody } from "./ResourceSectionBody";

interface ResourceSectionProps {
  address: HumanAddr;
  resourcesByOwner: Option<ResourceGroupByAccount[]>;
  isLoading: boolean;
}

export const ResourceSection = ({
  address,
  resourcesByOwner,
  isLoading,
}: ResourceSectionProps) => (
  <Flex direction="column" mt={8}>
    <TableTitle
      helperText="Resources stored in this account"
      title="Resources"
      count={resourcesByOwner?.length}
    />
    <Flex
      gap={6}
      flexDirection={{ base: "column", md: "row" }}
      position="relative"
    >
      <ResourceSectionBody
        address={address}
        resourcesByOwner={resourcesByOwner}
        isLoading={isLoading}
      />
    </Flex>
  </Flex>
);
