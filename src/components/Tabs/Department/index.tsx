import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { DepartmentDetails } from "@/components/Profiles/DepartmentProfile/DepartmentDetails";
import { useInvetoryList } from "@/hooks/useInventoryList";
import { useUsersList } from "@/hooks/useUsersLists";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

interface DepartmentTabProps {
  department: {
    id: number;
    name: string;
    cost_center: number | null;
    is_board: boolean | null;
    board: string | null;
    responsible_id: string | null;
  };
}

export function DepartmentTab({ department }: DepartmentTabProps) {
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
          <DepartmentDetails department={department} />
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
