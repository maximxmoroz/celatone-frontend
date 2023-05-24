import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Input: ComponentStyleConfig = {
  variants: {
    "custom-outline": {
      field: {
        color: "text.main",
        border: "1px solid",
        borderColor: "gray.700",
        background: "none",
        borderRadius: "8px",
        _hover: {
          borderColor: "gray.600",
        },
        _focusWithin: {
          borderColor: "secondary.main",
          borderWidth: "2px",
        },
        _active: {
          borderColor: "secondary.main",
          borderWidth: "2px",
        },
        _disabled: {
          borderStyle: "dashed",
          color: "text.disabled",
        },
        _invalid: {
          borderColor: "error.main",
        },
        _placeholder: { color: "gray.600" },
      },
    },
  },
  sizes: {
    md: {
      field: {
        padding: "8px 12px",
      },
    },
    lg: {
      field: {
        height: "56px",
        padding: "16px 12px",
        fontSize: "16px",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "custom-outline",
  },
};
