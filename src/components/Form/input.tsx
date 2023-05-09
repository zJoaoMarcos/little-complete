import { forwardRef, ForwardRefRenderFunction } from "react";

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name} pl="1">
          {label}:
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        variant="filled"
        _hover={{ bgColor: useColorModeValue("gray.300", "gray.800") }}
        focusBorderColor="pink.400"
        size="lg"
        {...rest}
        ref={ref}
        _readOnly={{ cursor: "default" }}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
