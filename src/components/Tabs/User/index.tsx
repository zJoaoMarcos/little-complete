import { UserProfileGrid } from "@/components/Grids/UserProfileGrid";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { TriggerAssociateEquipment } from "@/components/Modals/AssociateEquipment/Trigger";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number; name: string };
  status: string;
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

interface UserTabProps {
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

export function UserTab({ user, equipments }: UserTabProps) {
  return (
    <Tabs colorScheme="purple">
      <TabList>
        <Tab>Info</Tab>
        <Tab>Equipamentos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <UserProfileGrid user={user} />
        </TabPanel>

        <TabPanel
          display="flex"
          flexDir="column"
          justifyContent="center"
          w="full"
        >
          <Box ml="auto" mb="10">
            <TriggerAssociateEquipment />
          </Box>
          {equipments && <EquipmentsList equipments={equipments} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}