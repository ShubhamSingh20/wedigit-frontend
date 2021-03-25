import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/core";
import React from "react";

const TextField = React.forwardRef(
  (
    {
      formControlProps,
      label,
      error,
      helperText,
      value,
      InputComponent,
      textarea,
      ...props
    },
    ref
  ) => {
    const InputField = textarea ? Textarea : Input;
    return (
      <FormControl isInvalid={!!error} {...formControlProps}>
        {label && <FormLabel>{label}</FormLabel>}
        {InputComponent ?? (
          <InputField ref={ref} value={value} placeholder={label} {...props} />
        )}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default TextField;
