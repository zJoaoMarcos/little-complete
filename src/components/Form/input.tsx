import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  useColorModeValue,
} from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
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
      />
    </FormControl>
  );
}
