import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface MobileCardTemplateProps {
  topContent: ReactNode;
  middleContent: ReactNode;
  bottomContent?: ReactNode;
  onClick?: () => void;
}
export const MobileCardTemplate = ({
  topContent,
  middleContent,
  bottomContent,
  onClick,
}: MobileCardTemplateProps) => (
  <Flex
    borderRadius="8px"
    background="gray.900"
    p={3}
    cursor="pointer"
    direction="column"
    gap={3}
    w="full"
    onClick={onClick}
  >
    <Flex align="center" justify="space-between">
      {topContent}
    </Flex>
    <Flex
      borderTop="1px solid"
      borderBottom={bottomContent ? "1px solid" : "0px"}
      borderColor="gray.700"
      pt={3}
      pb={bottomContent ? 3 : 0}
      direction="column"
    >
      {middleContent}
    </Flex>
    {bottomContent && <Flex>{bottomContent}</Flex>}
  </Flex>
);
