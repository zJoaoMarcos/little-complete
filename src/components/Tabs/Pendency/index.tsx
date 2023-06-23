import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { useInvetoryList } from "@/hooks/useInventoryList";
import { useUsersList } from "@/hooks/useUsersLists";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

export function PendencyTabs() {
  const { data: equipments } = useInvetoryList({
    key: "equipments-pendencies",
    status: "pendency",
  });

  const { data: users } = useUsersList({
    key: "users-pendencies",
    status: "pendency",
  });

  return (
    <Tabs colorScheme="purple" mt="10">
      <TabList>
        <Tab fontWeight="semibold">Usuários ({users?.totalCount})</Tab>
        <Tab fontWeight="semibold">Equipamentos ({equipments?.totalCount})</Tab>
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
  );
}
