import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { UpdateDepartmentDataForm } from "@/components/Forms/UpdateDepartmentDataForm";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { useInvetoryList } from "@/hooks/useInventoryList";
import { useUsersList } from "@/hooks/useUsersLists";
import { ProfileTabsProps } from "./types";

export function ProfileTabs({ department }: ProfileTabsProps) {
  const { data: equipments } = useInvetoryList({
    key: `inventory-${department.id}`,
    departmentId: department.id,
  });

  const { data: users } = useUsersList({
    key: `user-${department.id}`,
    departmentId: department.id,
  });

  return (
    <Tabs colorScheme="purple">
      <TabList>
        <Tab fontWeight="semibold">Info</Tab>
        <Tab fontWeight="semibold">Usuários ({users?.totalCount})</Tab>
        <Tab fontWeight="semibold">Equipamentos ({equipments?.totalCount})</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UpdateDepartmentDataForm department={department} />
        </TabPanel>

        <TabPanel>
          <UsersList users={users?.users!} />
        </TabPanel>

        <TabPanel>
          <EquipmentsList equipments={equipments?.equipments} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
