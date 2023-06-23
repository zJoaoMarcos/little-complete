import { Avatar, AvatarBadge } from "@chakra-ui/react";
import {
  ComputerTower,
  DesktopTower,
  DeviceMobile,
  DeviceTablet,
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
  return (
    <Avatar
      size={avatarSize}
      bgColor="purple.400"
      icon={<EquipmentIcon type={type} iconSize={iconSize} />}
    >
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

interface EquipmentIconProps {
  type: string | null;
  iconSize: string;
}

function EquipmentIcon({ type, iconSize }: EquipmentIconProps) {
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

  if (type === "Tablet") {
    return <DeviceTablet size={iconSize} />;
  }

  if (type === "Smartphone") {
    return <DeviceMobile size={iconSize} />;
  }

  if (type === "Scanner") {
    return <Printer size={iconSize} />;
  }

  return <ComputerTower size={iconSize} />;
}

function statusColor(status: string) {
  if (status === "available") {
    return "green.400";
  }

  if (status === "disabled") {
    return "gray.700";
  }

  if (status === "maintenance") {
    return "orange.400";
  }

  if (status === "borrwed") {
    return "orange.500";
  }

  if (status === "pendency") {
    return "red.600";
  }

  if (status === "in use") {
    return "blue.400";
  }
}
