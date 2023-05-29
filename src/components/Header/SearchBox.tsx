/* eslint-disable react/no-children-prop */
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBoxProps {
  setWords: (words: string) => void;
}

export function SearchBox({ setWords }: SearchBoxProps) {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      position="relative"
    >
      <InputGroup px="4">
        <InputRightElement children={<MagnifyingGlass />} />

        <Input
          type="text"
          variant="flushed"
          placeholder="Buscar..."
          onChange={(e) => setWords(e.target.value)}
          focusBorderColor={useColorModeValue("gray.700", "gray.100")}
        />
      </InputGroup>
    </Flex>
  );
}
