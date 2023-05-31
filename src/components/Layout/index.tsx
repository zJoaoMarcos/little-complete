import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  setWords?: (words: string) => void;
}

export function Layout({ children, setWords }: LayoutProps) {
  return (
    <Flex flexDir="column" h="100vh">
      <Header setWords={setWords} />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
        <Sidebar />
        <Box
          flex="1"
          h="full"
          p="8"
          bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          overflowX="auto"
          borderRadius="md"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
