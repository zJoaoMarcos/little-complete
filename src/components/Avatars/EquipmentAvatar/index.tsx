import { Avatar, AvatarBadge } from "@chakra-ui/react";
import {
  Desktop,
  DesktopTower,
  Laptop,
  Monitor,
  Phone,
  Printer,
  VirtualReality,
} from "@phosphor-icons/react";

interface EquipmentAvatarProps {
  type: string;
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
  console.log(status);
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

function equipmentIcon(type: string, iconSize: string) {
  type = type.toLocaleLowerCase();

  if (type === "desktop") {
    return <DesktopTower size={iconSize} />;
  }

  if (type === "monitor") {
    return <Monitor size={iconSize} />;
  }

  if (type === "telephone") {
    return <Phone size={iconSize} />;
  }

  if (type === "notebook") {
    return <Laptop size={iconSize} />;
  }

  if (type === "vr") {
    return <VirtualReality size={iconSize} />;
  }

  if (type === "scanner") {
    return <Printer size={iconSize} />;
  }
  return <Desktop size={iconSize} />;
}

function statusColor(status: string) {
  status = status.trim();
  if (status === "avaliable") {
    return "green.400";
  }

  if (status === "disabled") {
    return "gray.700";
  }

  if (status === "maintenace") {
    return "orange.400";
  }

  if (status === "pendency") {
    return "red.600";
  }

  if (status === "in use") {
    return "blue.400";
  }
}
