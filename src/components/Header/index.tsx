import { Divider, Flex, Heading, HStack, IconButton } from "@chakra-ui/react";
import { MoonStars } from "@phosphor-icons/react";
import { Profile } from "./Profile";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      px="6"
      mx="auto"
      mt="4"
      align="center"
      justify="space-between"
    >
      <Heading as="h2" size="lg" fontWeight="normal">
        myStock
      </Heading>

      <HStack h="full" spacing="4">
        <IconButton
          aria-label="theme"
          icon={<MoonStars size={24} />}
          bg="none"
          isRound
        />

        <Divider orientation="vertical" />

        <Profile />
      </HStack>
    </Flex>
  );
}
