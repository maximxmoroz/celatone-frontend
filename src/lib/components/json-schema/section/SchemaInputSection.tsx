import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import type { RJSFSchema, RJSFValidationError } from "@rjsf/utils";
import { capitalize } from "lodash";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";

import { AttachSchemaCard } from "../AttachSchemaCard";
import { JsonSchemaForm } from "../form";
import { JsonSchemaModal } from "../JsonSchemaModal";
import { ViewSchemaModal } from "../view/ViewSchemaModal";
import { AmpEvent, track } from "lib/amplitude";
import { CustomIcon } from "lib/components/icon";
import type { CodeSchema } from "lib/stores/schema";
import type { Option } from "lib/types";

interface SchemaSectionProps {
  type: "migrate" | "instantiate";
  codeHash: string;
  codeId: string;
  jsonSchema: Option<CodeSchema>;
  initialFormData?: Record<string, unknown>;
  handleChange: (data: unknown, errors: RJSFValidationError[]) => void;
  onSchemaSave?: () => void;
}

export const SchemaInputSection = observer(
  ({
    type,
    codeHash,
    codeId,
    jsonSchema,
    initialFormData,
    handleChange,
    onSchemaSave,
  }: SchemaSectionProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const msgSchema = jsonSchema?.[type];
    const prettyType = capitalize(type);

    const handleReattach = useCallback(() => {
      onOpen();
      track(AmpEvent.USE_EDIT_ATTACHED_JSON);
    }, [onOpen]);

    return (
      <>
        <Flex
          direction="column"
          backgroundColor="gray.900"
          borderRadius="8px"
          p="24px 16px"
          mb={4}
          align={msgSchema ? "flex-start" : "center"}
        >
          {msgSchema ? (
            <>
              {/* TODO: revisit type assertion later */}
              {msgSchema.properties ? (
                <div style={{ width: "100%" }}>
                  <JsonSchemaForm
                    schema={jsonSchema[type] as RJSFSchema}
                    formId={type}
                    initialFormData={initialFormData}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <Text
                  variant="body2"
                  textColor="text.disabled"
                  fontWeight={500}
                  bgColor="gray.800"
                  w="full"
                  py={4}
                  border="1px solid var(--chakra-colors-gray-700)"
                  borderRadius="4px"
                  textAlign="center"
                >
                  {`${prettyType}Msg in attached JSON Schema takes no input`}
                </Text>
              )}
            </>
          ) : (
            <>
              <Text color="text.main" fontWeight={700} variant="body1">
                {jsonSchema ? (
                  `Attached JSON Schema doesn’t have ${prettyType}Msg`
                ) : (
                  <>
                    You haven&#39;t attached the JSON Schema for{" "}
                    <CustomIcon name="code" mx={1} color="gray.400" />
                    code {codeId} yet
                  </>
                )}
              </Text>
              <Text
                color="text.disabled"
                fontWeight={500}
                variant="body2"
                mt={2}
                mb={4}
              >
                {jsonSchema
                  ? `Please fill in ${prettyType} Message manually or change the schema`
                  : "Your attached JSON schema will be stored locally on your device"}
              </Text>
              <AttachSchemaCard
                attached={Boolean(jsonSchema)}
                schema={jsonSchema}
                codeId={codeId}
                codeHash={codeHash}
                openModal={onOpen}
              />
            </>
          )}
          <JsonSchemaModal
            isOpen={isOpen}
            onClose={onClose}
            codeHash={codeHash}
            codeId={codeId}
            onSchemaSave={onSchemaSave}
            isReattach={Boolean(msgSchema)}
          />
        </Flex>
        {msgSchema && (
          <Flex align="center" justify="space-between" w="full" mb={4}>
            <Text color="text.dark" variant="body2">
              You are using a locally attached JSON Schema
            </Text>
            <Flex gap={3}>
              <ViewSchemaModal codeId={codeId} jsonSchema={jsonSchema} />
              <Button variant="outline-gray" size="sm" onClick={handleReattach}>
                Reattach
              </Button>
            </Flex>
          </Flex>
        )}
      </>
    );
  }
);
