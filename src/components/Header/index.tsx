import { Box, Heading, Switch, useColorMode } from "@chakra-ui/react";

export function Header() {
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      as="head"
      w="100%"
      display="flex"
      justifyContent="space-between"
      px="20"
      py="4"
      borderBottom="1px"
      borderColor="gray.50"
    >
      <Heading as="h3" size="lg">
        My Stock
      </Heading>

      {/* <Button onClick={toggleColorMode}>Toggle Color Mode</Button> */}
      <Switch size="sm" onClick={toggleColorMode} />
    </Box>
  );
}
