import type { ButtonProps } from "@chakra-ui/react";
import { Button, useToast, Box } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { ActionModal } from "../ActionModal";
import { AmpEvent, track } from "lib/amplitude";
import { useCelatoneApp } from "lib/app-provider";
import type { FormStatus } from "lib/components/forms";
import { TextInput } from "lib/components/forms";
import { CustomIcon } from "lib/components/icon";
import { useGetMaxLengthError, useUserKey } from "lib/hooks";
import { useContractStore } from "lib/providers/store";
import { shortenName } from "lib/utils";

interface CreateNewListModalProps {
  buttonProps?: ButtonProps;
  trigger?: ReactNode;
  onCreate?: (listName: string) => void;
  onClose?: () => void;
  inputValue?: string;
}

export function CreateNewListModal({
  buttonProps,
  trigger,
  inputValue,
  onCreate,
  onClose,
}: CreateNewListModalProps) {
  const { constants } = useCelatoneApp();
  const getMaxLengthError = useGetMaxLengthError();
  const userKey = useUserKey();
  const { createNewList, isContractListExist } = useContractStore();

  const [listName, setListName] = useState<string>("");
  const [status, setStatus] = useState<FormStatus>({ state: "init" });

  const resetListName = useCallback(() => {
    setListName(inputValue ?? "");
    onClose?.();
  }, [onClose, inputValue]);

  // TODO: apply useForm
  useEffect(() => {
    const trimedListName = listName.trim();
    if (trimedListName.length === 0) {
      setStatus({ state: "init" });
    } else if (trimedListName.length > constants.maxListNameLength)
      setStatus({
        state: "error",
        message: getMaxLengthError(trimedListName.length, "list_name"),
      });
    else if (isContractListExist(userKey, trimedListName))
      setStatus({ state: "error", message: "Already existed" });
    else setStatus({ state: "success" });
  }, [
    constants.maxListNameLength,
    getMaxLengthError,
    isContractListExist,
    listName,
    userKey,
  ]);

  const toast = useToast();
  const handleCreate = useCallback(() => {
    // TODO: check list name and different toast status
    createNewList(userKey, listName);
    resetListName();
    onCreate?.(listName);
    onClose?.();

    track(AmpEvent.LIST_CREATE);

    toast({
      title: `Create ${shortenName(listName)} successfully`,
      status: "success",
      duration: 5000,
      isClosable: false,
      position: "bottom-right",
      icon: <CustomIcon name="check-circle-solid" color="success.main" />,
    });
  }, [
    createNewList,
    userKey,
    listName,
    resetListName,
    onCreate,
    onClose,
    toast,
  ]);

  useEffect(() => {
    if (inputValue !== undefined) setListName(inputValue);
  }, [inputValue]);

  return (
    <ActionModal
      title="Create a New List"
      icon="add-new-solid"
      trigger={trigger || <Button {...buttonProps} as="button" />}
      mainBtnTitle="Create"
      mainAction={handleCreate}
      disabledMain={status.state !== "success"}
      otherBtnTitle="Cancel"
      otherAction={resetListName}
    >
      <Box py={4}>
        <TextInput
          variant="fixed-floating"
          value={listName}
          setInputState={setListName}
          labelBgColor="gray.900"
          status={status}
          label="List Name"
        />
      </Box>
    </ActionModal>
  );
}
