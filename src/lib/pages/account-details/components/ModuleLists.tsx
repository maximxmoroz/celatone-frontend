import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { useInternalNavigate, useMobile } from "lib/app-provider";
import { CustomIcon } from "lib/components/icon";
import InputWithIcon from "lib/components/InputWithIcon";
import { Loading } from "lib/components/Loading";
import { ModuleCard } from "lib/components/module";
import { EmptyState } from "lib/components/state";
import { TableTitle, ViewMore } from "lib/components/table";
import { type IndexedModule } from "lib/services/move/moduleService";
import type { HumanAddr, Option } from "lib/types";

import { ErrorFetching } from "./ErrorFetching";

interface ModuleListsProps {
  totalCount: Option<number>;
  selectedAddress: HumanAddr;
  modules: Option<IndexedModule[]>;
  isLoading: boolean;
  onViewMore?: () => void;
}

export const ModuleLists = ({
  totalCount,
  selectedAddress,
  modules,
  isLoading,
  onViewMore,
}: ModuleListsProps) => {
  const isMobile = useMobile();
  const navigate = useInternalNavigate();

  const [keyword, setKeyword] = useState("");

  const filteredModules = useMemo(() => {
    if (!keyword) return modules;

    return modules?.filter(
      (module) =>
        module.moduleName?.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, modules]);

  const handleOnSelect = (module: IndexedModule) => {
    navigate({
      pathname: `/modules/[address]/[moduleName]`,
      query: {
        address: selectedAddress,
        moduleName: module.moduleName,
      },
    });
  };

  if (isLoading) return <Loading />;
  if (!modules) return <ErrorFetching />;

  const isMobileOverview = isMobile && !!onViewMore;
  return (
    <Flex
      direction="column"
      mt={{ base: 4, md: 8 }}
      mb={{ base: 0, md: 8 }}
      width="full"
    >
      {isMobileOverview ? (
        <Flex
          justify="space-between"
          w="full"
          bg="gray.900"
          borderRadius="8px"
          p={4}
          onClick={onViewMore}
        >
          <TableTitle title="Modules" count={totalCount} mb={0} />
          <CustomIcon name="chevron-right" color="gray.600" />
        </Flex>
      ) : (
        <>
          <TableTitle
            title="Module Instances"
            helperText="Modules are ‘smart contracts’ deployed by this account"
            count={totalCount}
          />
          <Flex direction="column" gap={8}>
            {!onViewMore && (
              <InputWithIcon
                placeholder="Search with Module Name..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                action="execute-message-search"
              />
            )}
            {filteredModules?.length ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} mb={6}>
                {(onViewMore
                  ? filteredModules.slice(0, 9)
                  : filteredModules
                ).map((item) => (
                  <ModuleCard
                    key={item.moduleName}
                    selectedAddress={selectedAddress}
                    module={item}
                    selectedModule={undefined}
                    setSelectedModule={handleOnSelect}
                  />
                ))}
              </SimpleGrid>
            ) : (
              <EmptyState
                imageVariant="not-found"
                message="No matched modules found"
                withBorder
                my={0}
              />
            )}
          </Flex>
        </>
      )}
      {!isMobile && onViewMore && Number(filteredModules?.length) > 9 && (
        <ViewMore onClick={onViewMore} />
      )}
    </Flex>
  );
};
