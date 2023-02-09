import {
  Heading,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

import { CustomTab } from "lib/components/CustomTab";
import { FilterByPermission } from "lib/components/forms/FilterByPermission";
import InputWithIcon from "lib/components/InputWithIcon";
import type { PermissionFilterValue } from "lib/hooks";
import CodesTable from "lib/pages/codes/components/CodesTable";

import SaveCodeButton from "./components/SaveCodeButton";
import UploadButton from "./components/UploadButton";
import { useCodeListData } from "./data";

interface AllCodeState {
  keyword: string;
  permissionValue: PermissionFilterValue;
}

const Codes = observer(() => {
  const { watch, setValue } = useForm<AllCodeState>({
    defaultValues: {
      permissionValue: "all",
      keyword: "",
    },
  });
  const { keyword, permissionValue } = watch();
  const {
    storedCodesCount,
    storedCodes: stored,
    savedCodesCount,
    savedCodes: saved,
    allCodesCount,
  } = useCodeListData(keyword, permissionValue);

  return (
    <Box>
      <Box pt="48px" px="48px">
        <Heading as="h1" size="lg" color="white" mb={4}>
          My Codes
        </Heading>
      </Box>
      <Tabs>
        <Box py={4}>
          <TabList
            mb="32px"
            borderBottom="1px"
            px={12}
            borderColor="pebble.800"
          >
            <CustomTab count={allCodesCount}>All Codes</CustomTab>
            <CustomTab count={storedCodesCount}>My Stored Codes</CustomTab>
            <CustomTab count={savedCodesCount}>My Saved Codes </CustomTab>
          </TabList>
          <Flex gap={2} px="48px">
            <InputWithIcon
              placeholder="Search with code ID or code name"
              value={keyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setValue("keyword", e.target.value)
              }
              size="lg"
            />
            <FilterByPermission
              initialSelected="all"
              setPermissionValue={(newVal: PermissionFilterValue) => {
                if (newVal === permissionValue) return;
                setValue("permissionValue", newVal);
              }}
            />
          </Flex>
        </Box>
        <TabPanels>
          <TabPanel p={0}>
            <CodesTable
              type="stored"
              tableName="My Stored Codes"
              codes={stored}
              action={<UploadButton />}
              isSearching={!!keyword}
            />
            <CodesTable
              type="saved"
              tableName="My Saved Codes"
              codes={saved}
              action={<SaveCodeButton />}
              isRemovable
              isSearching={!!keyword}
            />
          </TabPanel>
          <TabPanel p="0px">
            <CodesTable
              type="stored"
              tableName="My Stored Codes"
              codes={stored}
              action={<UploadButton />}
              isSearching={!!keyword}
            />
          </TabPanel>
          <TabPanel p="0px">
            <CodesTable
              type="saved"
              tableName="My Saved Codes"
              codes={saved}
              action={<SaveCodeButton />}
              isSearching={!!keyword}
              isRemovable
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
});

export default Codes;
