import { DepartmentProfileGrid } from "@/components/Grids/DepartmentProfileGrid";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { UsersList } from "@/components/Lists/UserLists";
import { useFetchInvetoryListByDepartment } from "@/hooks/UseFetchInventoryListByDepartment";
import { useFetchUsersListByDepartment } from "@/hooks/UseFetchUsersListByDepartment";
import {
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

interface DepartmentTabProps {
  department: {
    id: number;
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export function DepartmentTab({ department }: DepartmentTabProps) {
  const { data: users } = useFetchUsersListByDepartment(department.id);

  const {
    data: equipments,
    isLoading,
    isError,
  } = useFetchInvetoryListByDepartment(department.id);

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
          {isLoading ? <Skeleton /> : <UsersList users={users?.users!} />}
        </TabPanel>

        <TabPanel>
          {isLoading ? (
            <Skeleton />
          ) : (
            <EquipmentsList equipments={equipments?.equipments!} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
