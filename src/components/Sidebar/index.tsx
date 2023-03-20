import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { HouseSimple } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text>CONTROLES</Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={HouseSimple} />
              <Text ml="4" fontWeight="medium">
                Home
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
