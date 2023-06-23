import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { TriggerAssignEquipment } from "@/components/Modals/AssignEquipmentModal/Trigger";
import { UserDetails } from "./UserDetails";
import { UserTabsProps } from "./types";

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
