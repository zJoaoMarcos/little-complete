import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";
import {
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { List, MoonStars, SunDim } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

interface HeaderProps {
  setWords?: (words: string) => void;
}

export function Header({ setWords }: HeaderProps) {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen } = useSidebarDrawer();

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
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={List} />}
          fontSize="30"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          mt="2"
        ></IconButton>
      )}
      <Logo />

      {isWideVersion && setWords && <SearchBox setWords={setWords} />}

      <HStack h="full" spacing="4" ml="auto">
        <IconButton
          aria-label="theme"
          icon={
            colorMode === "light" ? (
              <MoonStars weight="fill" color="darkblue" size={24} />
            ) : (
              <SunDim weight="fill" color="yellow" size={24} />
            )
          }
          onClick={toggleColorMode}
          bg="none"
          isRound
        />

        <Divider orientation="vertical" />

        <Profile showProfileData={isWideVersion} />
      </HStack>
    </Flex>
  );
}
