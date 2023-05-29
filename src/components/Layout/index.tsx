import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDir="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
        <Sidebar />
        {children}
      </Flex>
    </Flex>
  );
}
