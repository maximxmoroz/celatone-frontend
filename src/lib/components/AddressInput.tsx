import type { ReactNode } from "react";
import { useCallback } from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { useWatch } from "react-hook-form";

import { useCelatoneApp, useValidateAddress } from "lib/app-provider";
import type { FormStatus, TextInputProps } from "lib/components/forms";
import { ControllerInput } from "lib/components/forms";
import type { Option } from "lib/types";

interface AddressInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "value" | "setInputState"> {
  name: FieldPath<T>;
  control: Control<T>;
  validation?: RegisterOptions["validate"];
  maxLength?: number;
  helperAction?: ReactNode;
  reequiredText?: string;
}

const getAddressStatus = (input: string, error: Option<string>): FormStatus => {
  if (error) return { state: "error", message: error };
  if (!input) return { state: "init" };
  return { state: "success", message: "Valid Address" };
};

export const AddressInput = <T extends FieldValues>({
  name,
  control,
  label,
  labelBgColor = "background.main",
  helperText,
  placeholder,
  error,
  size = "lg",
  validation = {},
  maxLength,
  helperAction,
  reequiredText = "Address is empty",
}: AddressInputProps<T>) => {
  const {
    appHumanAddress: { example: exampleAddr },
  } = useCelatoneApp();
  const { validateUserAddress, validateContractAddress } = useValidateAddress();
  const validateAddress = useCallback(
    (input: string) =>
      input && !!validateContractAddress(input) && !!validateUserAddress(input)
        ? "Invalid address or not exists."
        : undefined,
    [validateContractAddress, validateUserAddress]
  );

  const watcher = useWatch({
    name,
    control,
  });

  const status = getAddressStatus(watcher, error ?? validateAddress(watcher));

  return (
    <ControllerInput
      name={name}
      control={control}
      label={label}
      placeholder={placeholder ?? exampleAddr}
      type="text"
      variant="floating"
      status={status}
      labelBgColor={labelBgColor}
      helperText={helperText}
      size={size}
      rules={{
        required: reequiredText,
        validate: { validateAddress, ...validation },
      }}
      maxLength={maxLength}
      helperAction={helperAction}
    />
  );
};
