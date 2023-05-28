import { EquipmentProfileGrid } from "@/components/Grids/EquipmentProfileGrid";
import { Box, Divider, useColorModeValue } from "@chakra-ui/react";
import { ProfileHeader } from "./ProfileHeader";

interface EquipmentProfileProps {
  equipment: {
    id: string;
    type: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: {
      id: number | null;
      name: string | null;
    };
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
  };
}

export function EquipmentProfile({ equipment }: EquipmentProfileProps) {
  return (
    <Box
      flex="1"
      h="full"
      p="8"
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      overflowX="auto"
      borderRadius="md"
    >
      <ProfileHeader equipment={equipment!} />

      <Divider />

      <EquipmentProfileGrid equipment={equipment!} />
    </Box>
  );
}
