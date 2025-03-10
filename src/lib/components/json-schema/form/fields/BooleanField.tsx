/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  FieldProps,
  RJSFSchemaDefinition,
  EnumOptionsType,
  RJSFSchema,
} from "@rjsf/utils";
import { getWidget, getUiOptions, optionsList } from "@rjsf/utils";
import isObject from "lodash/isObject";

/** The `BooleanField` component is used to render a field in the schema is boolean. It constructs `enumOptions` for the
 * two boolean values based on the various alternatives in the schema.
 *
 * @param props - The `FieldProps` for this template
 */
function BooleanField<T = any, F = any>(props: FieldProps<T, F>) {
  const {
    schema,
    name,
    uiSchema,
    idSchema,
    formData,
    registry,
    required,
    disabled,
    readonly,
    autofocus,
    onChange,
    onFocus,
    onBlur,
    rawErrors,
  } = props;
  const { title } = schema;
  const { widgets, formContext } = registry;
  const { widget = "select", ...options } = getUiOptions<T, F>(uiSchema);
  const Widget = getWidget(schema, widget, widgets);

  let enumOptions: EnumOptionsType[] | undefined;

  if (Array.isArray(schema.oneOf)) {
    enumOptions = optionsList({
      oneOf: schema.oneOf
        .map((option: RJSFSchemaDefinition) => {
          if (isObject(option)) {
            return {
              ...option,
              title: option.title || (option.const === true ? "True" : "False"),
            };
          }
          return undefined;
        })
        .filter((o) => o) as RJSFSchemaDefinition[], // cast away the error that typescript can't grok is fixed
    });
  } else {
    // We deprecated enumNames in v5. It's intentionally omitted from RSJFSchema type, so we need to cast here.
    const schemaWithEnumNames = schema as RJSFSchema & { enumNames?: string[] };
    const enums = schema.enum ?? [false, true];
    if (
      !schemaWithEnumNames.enumNames &&
      enums &&
      enums.length === 2 &&
      enums.every((v) => typeof v === "boolean")
    ) {
      enumOptions = [
        {
          value: enums[0],
          label: enums[0] ? "True" : "False",
        },
        {
          value: enums[1],
          label: enums[1] ? "True" : "False",
        },
      ];
    } else {
      enumOptions = optionsList({
        enum: enums,
        // NOTE: enumNames is deprecated, but still supported for now.
        enumNames: schemaWithEnumNames.enumNames,
      } as RJSFSchema);
    }
  }

  if (!required)
    enumOptions = [...(enumOptions ?? []), { value: null, label: "null" }];

  return (
    <Widget
      options={{ ...options, enumOptions }}
      placeholder={readonly ? undefined : "Select boolean option"}
      schema={schema}
      uiSchema={uiSchema}
      id={idSchema && idSchema.$id}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      label={title === undefined ? name : title}
      value={formData}
      required={required}
      disabled={disabled}
      readonly={readonly}
      registry={registry}
      formContext={formContext}
      autofocus={autofocus}
      rawErrors={rawErrors}
    />
  );
}

export default BooleanField;
