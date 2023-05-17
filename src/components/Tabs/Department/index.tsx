import { DepartmentProfileGrid } from "@/components/Grids/DepartmentProfileGrid";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { useFetchInvetoryListByDepartment } from "@/hooks/UseFetchInventoryListByDepartment";
import { useFetchUsersListByDepartment } from "@/hooks/UseFetchUsersListByDepartment";
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
  const { data: users } = useFetchUsersListByDepartment(department.id);
  const { data: equipments, isLoading } = useFetchInvetoryListByDepartment(
    department.id
  );
  console.log(equipments);

  return (
    <Tabs colorScheme="purple">
      <TabList>
        <Tab>Info</Tab>
        <Tab>Usuários</Tab>
        <Tab>Equipamentos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <DepartmentProfileGrid department={department} />
        </TabPanel>

        <TabPanel>
          <UsersList users={users?.users!} />
        </TabPanel>

        <TabPanel>
          {equipments && (
            <EquipmentsList equipments={equipments?.equipments!} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
