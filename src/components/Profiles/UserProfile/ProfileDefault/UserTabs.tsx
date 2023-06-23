import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { TriggerAssignEquipment } from "@/components/Modals/AssignEquipmentModal/Trigger";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { UserDetails } from "./UserDetails";

interface EquipmentProps {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
}

interface UserTabsProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string | null;
  };

  equipments: EquipmentProps[];
}

export function UserTabs({ user, equipments }: UserTabsProps) {
  return (
    <Tabs colorScheme="purple">
      <TabList>
        <Tab fontWeight="semibold">Info</Tab>
        {user.status !== "disabled" && (
          <Tab fontWeight="semibold">Equipamentos</Tab>
        )}
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserDetails user={user} />
        </TabPanel>

        <TabPanel
          display="flex"
          flexDir="column"
          justifyContent="center"
          w="full"
        >
          <Box ml="auto" mb="10">
            <TriggerAssignEquipment
              userName={user.user_name}
              departmentId={user.department.id}
            />
          </Box>

          <EquipmentsList equipments={equipments} buttonUnassign={true} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
