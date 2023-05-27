import { UserTab } from "@/components/Tabs/User";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { ProfileHeader } from "./ProfileHeader";

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

interface ProfileDefaultProps {
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
    status: string;
  };

  equipments: Equipment[];
}

export function ProfileDefault({ user, equipments }: ProfileDefaultProps) {
  return (
    <Box
      flex="1"
      h="full"
      p="8"
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      overflowX="auto"
      borderRadius="md"
    >
      <ProfileHeader user={user} />

      <UserTab user={user} equipments={equipments} />
    </Box>
  );
}
