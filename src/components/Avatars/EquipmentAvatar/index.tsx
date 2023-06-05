import { Avatar, AvatarBadge } from "@chakra-ui/react";
import {
  DesktopTower,
  Laptop,
  Monitor,
  Phone,
  Printer,
  VirtualReality,
} from "@phosphor-icons/react";

interface EquipmentAvatarProps {
  type: string | null;
  status?: string;
  iconSize?: string;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs";
}

export function EquipmentAvatar({
  type,
  status,
  avatarSize = "sm",
  iconSize = "20",
}: EquipmentAvatarProps) {
  const icon = equipmentIcon(type, iconSize);
  return (
    <Avatar size={avatarSize} bgColor="purple.400" icon={icon}>
      {status && (
        <AvatarBadge
          bg={statusColor(status)}
          boxSize="0.90em"
          border="2px"
          borderColor="white"
          mr="1"
        />
      )}
    </Avatar>
  );
}

function equipmentIcon(type: string | null, iconSize: string) {
  if (type === "Desktop") {
    return <DesktopTower size={iconSize} />;
  }

  if (type === "Monitor") {
    return <Monitor size={iconSize} />;
  }

  if (type === "Telephone") {
    return <Phone size={iconSize} />;
  }

  if (type === "Notebook") {
    return <Laptop size={iconSize} />;
  }

  if (type === "Vr") {
    return <VirtualReality size={iconSize} />;
  }

  if (type === "Scanner") {
    return <Printer size={iconSize} />;
  }
}

function statusColor(status: string) {
  if (status === "avaliable") {
    return "green.400";
  }

  if (status === "disabled") {
    return "gray.700";
  }

  if (status === "maintenance") {
    return "orange.400";
  }

  if (status === "pendency") {
    return "red.600";
  }

  if (status === "in use") {
    return "blue.400";
  }
}
