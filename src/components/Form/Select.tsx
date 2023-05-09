import { forwardRef, ForwardRefRenderFunction } from "react";

import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import { FieldError } from "react-hook-form";

interface SelectProps extends ChakraSelectProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
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
      <ChakraSelect
        name={name}
        id={name}
        variant="filled"
        _hover={{ bgColor: useColorModeValue("gray.300", "gray.800") }}
        _readOnly={{ cursor: "default" }}
        focusBorderColor="pink.400"
        size="lg"
        {...rest}
        ref={ref}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
