import {
  Flex,
  Heading,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import router from "next/router";

import { BackButton } from "lib/components/button/BackButton";
import { CustomTab } from "lib/components/CustomTab";
import PageContainer from "lib/components/PageContainer";
import { useContractDetail } from "lib/model/contract";
import type { ContractAddr } from "lib/types";
import { getFirstQueryParam } from "lib/utils";

import { CommandSection } from "./components/CommandSection";
import { ContractDesc } from "./components/contract-description/ContractDesc";
import { ContractTop } from "./components/ContractTop";
import { InstantiateInfo } from "./components/InstantiateInfo";
import { JsonInfo } from "./components/JsonInfo";
import { TokenSection } from "./components/TokenSection";

const ContractDetails = observer(() => {
  /**
   * @todos add contract address validation function here
   */
  const contractAddress = getFirstQueryParam(router.query.contractAddress);
  const contractDetail = useContractDetail(contractAddress as ContractAddr);

  // TODO - Wait for design
  if (!contractDetail || !contractDetail.instantiateInfo) return null;

  return (
    <PageContainer>
      <BackButton />
      <ContractTop contractDetail={contractDetail} />
      {/* Tokens Section */}
      <TokenSection />
      {/* Contract Description Section */}
      <ContractDesc contractDetail={contractDetail} />
      {/* Query/Execute commands section */}
      <CommandSection />
      {/* Instantiate/Contract Info Section */}
      <Flex my={12} justify="space-between">
        {/* Instantiate Info */}
        <InstantiateInfo contractDetail={contractDetail} />
        {/* Contract Info (Expand) */}
        <Flex direction="column" flex={0.8} gap={6}>
          <JsonInfo header="Contract Info" />
          <JsonInfo header="Instantiate Messages" />
        </Flex>
      </Flex>
      {/* History Table section */}
      <Heading as="h6" variant="h6" mb={6}>
        History
      </Heading>
      <Tabs>
        <TabList border="none" mb="32px">
          <CustomTab count={100}>All</CustomTab>
          <CustomTab count={50}>Executes</CustomTab>
          <CustomTab count={20}>Migration</CustomTab>
          <CustomTab count={12}>Related Proposals</CustomTab>
        </TabList>
        {/* TODOs: Wireup with real table data, Make table component, and render each table with different data under each TabPanel */}
        <TabPanels>
          <TabPanel p={0}>
            <Heading as="h6" variant="h6" color="error.main">
              All Table
            </Heading>
          </TabPanel>
          <TabPanel p={0}>
            <Heading as="h6" variant="h6" color="error.main">
              Executes Table
            </Heading>
          </TabPanel>
          <TabPanel p={0}>
            <Heading as="h6" variant="h6" color="error.main">
              Migration Table
            </Heading>
          </TabPanel>
          <TabPanel p={0}>
            <Heading as="h6" variant="h6" color="error.main">
              Related Proposals Table
            </Heading>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageContainer>
  );
});

export default ContractDetails;
