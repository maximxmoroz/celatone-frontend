import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

import { CustomIcon } from "lib/components/icon";
import JsonReadOnly from "lib/components/json/JsonReadOnly";
import { Loading } from "lib/components/Loading";

interface JsonInfoProps {
  header: string;
  jsonString: string;
  isLoading: boolean;
  defaultExpand?: boolean;
}

export const JsonInfo = ({
  header,
  jsonString,
  isLoading,
  defaultExpand = false,
}: JsonInfoProps) => {
  const [expand, setExpand] = useState(defaultExpand);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        p="12px 16px"
        borderRadius="8px"
        background="gray.900"
        _hover={{ backgroundColor: "gray.800" }}
        transition="all 0.25s ease-in-out"
        cursor="pointer"
        onClick={() => setExpand((prev) => !prev)}
      >
        <Heading as="h6" variant="h6">
          {header}
        </Heading>
        <CustomIcon
          transition="all 0.25s ease-in-out"
          name={expand ? "chevron-up" : "chevron-down"}
          color="gray.600"
        />
      </Flex>
      <div
        style={expand ? { display: "block" } : { height: 0, display: "none" }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <JsonReadOnly text={jsonString} canCopy isExpandable />
        )}
      </div>
    </>
  );
};
