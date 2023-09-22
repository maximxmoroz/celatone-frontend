import { Flex, Heading, Button, Accordion } from "@chakra-ui/react";
import { useState } from "react";

import { CustomIcon } from "lib/components/icon";
import { Loading } from "lib/components/Loading";
import { FunctionDetailCard } from "lib/components/module/FunctionDetailCard";
import { AmpTrackExpandAll } from "lib/services/amplitude";
import type { IndexedModule } from "lib/services/moduleService";

import { FunctionTypeSwitch, FunctionTypeTabs } from "./FunctionTypeSwitch";

interface ModuleFunctionProps {
  moduleData: IndexedModule;
}

export const ModuleFunction = ({ moduleData }: ModuleFunctionProps) => {
  const [tab, setTab] = useState(FunctionTypeTabs.ALL);
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);
  const updateExpandedIndexes = (indexes: number[]) =>
    setExpandedIndexes(indexes);

  if (!moduleData) return <Loading />;

  return (
    <Flex direction="column" gap={8}>
      <Heading as="h6" variant="h6" fontWeight={600}>
        Exposed Function
      </Heading>
      <Flex>search input ja</Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <FunctionTypeSwitch
          currentTab={tab}
          onTabChange={setTab}
          my={3}
          counts={[
            moduleData.parsedAbi.exposed_functions.length,
            moduleData.viewFunctions.length,
            moduleData.executeFunctions.length,
          ]}
        />
        <Flex gap={4} alignItems="center">
          <Button
            variant="outline-primary"
            size="sm"
            rightIcon={
              <CustomIcon
                name={expandedIndexes.length ? "chevron-up" : "chevron-down"}
                boxSize={3}
              />
            }
            onClick={() => {
              AmpTrackExpandAll(expandedIndexes.length ? "collapse" : "expand");
              setExpandedIndexes((prev) =>
                !prev.length
                  ? Array.from(
                      Array(
                        moduleData.parsedAbi.exposed_functions.length
                      ).keys()
                    )
                  : []
              );
            }}
          >
            {expandedIndexes.length ? "Collapse All" : "Expand All"}
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            rightIcon={<CustomIcon name="launch" />}
            onClick={() => {
              const jsonString = JSON.stringify(
                moduleData.parsedAbi.exposed_functions,
                null,
                2
              );
              const jsonWindow = window.open();
              if (jsonWindow) {
                // Modify styling later
                jsonWindow.document.write(
                  `<html><head><title>Module Exposed Function</title>`
                );

                // Add styling
                jsonWindow.document.write(
                  "<style>body { background-color: #f0f0f0; color: #333; }</style>"
                );

                jsonWindow.document.write(
                  `</head><body><pre>${jsonString}</pre></body></html>`
                );
              }
            }}
          >
            View in JSON
          </Button>
        </Flex>
      </Flex>
      <Accordion
        allowMultiple
        index={expandedIndexes}
        onChange={updateExpandedIndexes}
      >
        <Flex direction="column" gap={4}>
          {moduleData.parsedAbi.exposed_functions.map((fn) => (
            <FunctionDetailCard exposedFn={fn} key={fn.name} />
          ))}
        </Flex>
      </Accordion>
    </Flex>
  );
};
