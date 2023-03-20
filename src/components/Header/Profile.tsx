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

export function Profile() {
  return (
    <Flex align="center">
      <Menu>
        <MenuButton py="2">
          <HStack>
            <Avatar name="João Matos" size="sm" />
            <VStack display="flex" align="start" spacing="1" ml="2">
              <Text fontSize="sm">João Matos</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
            </VStack>
            <Box display="flex">
              <CaretDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList borderColor="gray.600">
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
