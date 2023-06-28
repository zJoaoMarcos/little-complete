import {
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@/components/Layout";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { useInvetoryList } from "@/hooks/useInventoryList";
import { useUsersList } from "@/hooks/useUsersLists";

export default function Pendency() {
  const { data: equipments } = useInvetoryList({
    key: "equipments-pendencies",
    status: "pendency",
  });

  const { data: users } = useUsersList({
    key: "users-pendencies",
    status: "pendency",
  });

  return (
    <>
      <Head>
        <title>Pendências</title>
      </Head>

      <Flex>
        <Heading as="h3" fontWeight="semibold">
          Pendências
        </Heading>
      </Flex>

      <Tabs colorScheme="purple" mt="10">
        <TabList>
          <Tab fontWeight="semibold">Usuários ({users?.totalCount})</Tab>
          <Tab fontWeight="semibold">
            Equipamentos ({equipments?.totalCount})
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel
            display="flex"
            flexDir="column"
            justifyContent="center"
            w="full"
          >
            <UsersList users={users?.users} />
          </TabPanel>

          <TabPanel
            display="flex"
            flexDir="column"
            justifyContent="center"
            w="full"
          >
            <EquipmentsList equipments={equipments?.equipments} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

Pendency.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
