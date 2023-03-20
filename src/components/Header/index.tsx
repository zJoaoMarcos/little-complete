import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonStars, SunDim } from "@phosphor-icons/react";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="normal" w="64">
        myStock
      </Text>

      <SearchBox />

      <HStack h="full" spacing="4" ml="auto">
        <IconButton
          aria-label="theme"
          icon={
            colorMode === "light" ? (
              <MoonStars size={24} />
            ) : (
              <SunDim size={24} />
            )
          }
          onClick={toggleColorMode}
          bg="none"
          isRound
        />

        <Divider orientation="vertical" />

        <Profile />
      </HStack>
    </Flex>
  );
}
