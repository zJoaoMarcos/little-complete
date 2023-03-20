import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  useColorModeValue,
} from "@chakra-ui/react";

interface InputProps extends ChakraSelectProps {
  name: string;
  label?: string;
}

export function Select({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && (
        <FormLabel htmlFor={name} pl="1">
          {label}:
        </FormLabel>
      )}
      <ChakraSelect
        name={name}
        id={name}
        {...rest}
        variant="filled"
        _hover={{ bgColor: useColorModeValue("gray.300", "gray.800") }}
        focusBorderColor="pink.400"
        size="lg"
      />
    </FormControl>
  );
}
