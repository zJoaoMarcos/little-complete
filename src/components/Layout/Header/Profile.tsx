import { useAuth } from "@/contexts/Auth";
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

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { user, signOut } = useAuth();

  const handleSingOut = () => {
    signOut();
  };

  return (
    <Flex align="center">
      <Menu>
        <MenuButton py="2">
          <HStack>
            <Avatar name={user?.displayName} size="sm" />
            {showProfileData && (
              <>
                <VStack display="flex" align="start" spacing="1" ml="2">
                  {/*   <Text fontSize="sm">{session?.user?.name}</Text> */}
                  <Text fontSize="xs" color="gray.600">
                    {user?.displayName}
                  </Text>
                </VStack>
                <Box display="flex">
                  <CaretDown />
                </Box>
              </>
            )}
          </HStack>
        </MenuButton>
        <MenuList borderColor="gray.200">
          <p className="px-2 text-xs">{user?.email}</p>

          <MenuDivider />

          <MenuItem onClick={handleSingOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
