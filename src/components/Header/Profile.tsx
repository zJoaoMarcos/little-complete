import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";
import { signOut, useSession } from "next-auth/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { data: session } = useSession();

  const handleSingOut = () => {
    signOut();
  };

  return (
    <Flex align="center">
      <Menu>
        <MenuButton py="2">
          <HStack>
            <Avatar
              src={session?.user?.image!}
              name={session?.user?.name!}
              size="sm"
            />
            {showProfileData && (
              <>
                <VStack display="flex" align="start" spacing="1" ml="2">
                  <Text fontSize="sm">{session?.user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display="flex">
                  <CaretDown />
                </Box>
              </>
            )}
          </HStack>
        </MenuButton>
        <MenuList borderColor="gray.600">
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleSingOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
