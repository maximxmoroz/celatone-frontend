/* eslint-disable sonarjs/cognitive-complexity */
import {
  Box,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { type Control, useController } from "react-hook-form";

import { useValidateAddress } from "lib/app-provider";
import type { AbiFormData } from "lib/types";
import { isHexModuleAddress, isHexWalletAddress } from "lib/utils";

import { ArgFieldWidget } from "./ArgFieldWidget";
import { OBJECT_TYPE, STRING_TYPE } from "./constants";
import { getHelperText, getRules } from "./utils";

interface ArgFieldTemplateProps {
  index: number;
  param: string;
  control: Control<AbiFormData["args"]>;
}

export const ArgFieldTemplate = ({
  index,
  param,
  control,
}: ArgFieldTemplateProps) => {
  const [isEditted, setIsEditted] = useState(false);
  const { validateUserAddress, validateContractAddress } = useValidateAddress();

  const isValidArgAddress = useCallback(
    (input: string) =>
      validateUserAddress(input) === null ||
      validateContractAddress(input) === null ||
      isHexWalletAddress(input) ||
      isHexModuleAddress(input),
    [validateContractAddress, validateUserAddress]
  );
  const isValidArgObject = useCallback(
    (input: string) =>
      validateContractAddress(input) === null || isHexModuleAddress(input),
    [validateContractAddress]
  );

  const isOptional = param.startsWith("0x1::option::Option");
  const type = isOptional ? param.split(/<(.*)>/)[1] : param;
  const rules = getRules(type, isOptional, isValidArgAddress, isValidArgObject);

  const {
    field: { value, onChange, ...fieldProps },
    fieldState: { isTouched, error },
  } = useController({
    name: `${index}`,
    control,
    rules,
  });
  const isError = (isTouched || isEditted) && !!error;

  const size = "md";
  const isNull = value === null;
  return (
    <Box>
      <FormControl
        className={`${size}-form`}
        variant={
          (type === STRING_TYPE ||
            type.startsWith("vector") ||
            type.startsWith(OBJECT_TYPE)) &&
          !isNull
            ? "fixed-floating"
            : "floating"
        }
        size={size}
        isInvalid={isError}
        isDisabled={isNull}
        {...fieldProps}
      >
        <ArgFieldWidget
          type={type}
          value={value}
          onChange={(e) => {
            setIsEditted(true);
            onChange(e);
          }}
        />
        <FormLabel className={`${size}-label`} bgColor="background.main">
          {param}
        </FormLabel>

        {isError ? (
          <FormErrorMessage className="error-text" mt={1}>
            {error.message}
          </FormErrorMessage>
        ) : (
          <FormHelperText className="helper-text" mt={1}>
            {getHelperText(type)}
          </FormHelperText>
        )}
      </FormControl>
      {isOptional && (
        <Checkbox
          pt="2px"
          pl={2}
          isChecked={isNull}
          onChange={(e) => {
            const newValue = e.target.checked;
            onChange(newValue ? null : "");
          }}
        >
          <Text variant="body3">Send as null</Text>
        </Checkbox>
      )}
    </Box>
  );
};
