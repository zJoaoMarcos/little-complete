import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { TriggerAssignEquipment } from "@/components/Modals/AssignEquipment/Trigger";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { UserDetails } from "./UserDetails";

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number | null; name: string | null };
  status: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
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

  equipments: Equipment[];
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
