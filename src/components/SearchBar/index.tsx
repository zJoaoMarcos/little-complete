/* eslint-disable react/no-children-prop */
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export function SearchBar() {
  return (
    <Stack w="full">
      <InputGroup>
        <InputLeftElement children={<MagnifyingGlass />} />

        <Input
          type="text"
          placeholder="Buscar..."
          variant="flushed"
          focusBorderColor={useColorModeValue("gray.700", "gray.100")}
        />
      </InputGroup>
    </Stack>
  );
}
