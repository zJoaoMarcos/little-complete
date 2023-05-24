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

/* interface UserBadgeStatusProps {
  status?: string | null;
  badgeSize?: string;
}

export function EquipmentAvatarBadge({
  status,
  badgeSize = "1em",
}: UserBadgeStatusProps) {
  status = status?.trim();

  if (status === "avaliable") {
    return (
      <AvatarBadge
        borderColor="green.50"
        bg="green.300"
        boxSize={badgeSize}
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }

  if (status === "pendency") {
    return (
      <AvatarBadge
        borderColor="red.50"
        bg="red.700"
        boxSize={badgeSize}
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }

  if (status === "in use") {
    return (
      <AvatarBadge
        borderColor="blue.50"
        bg="blue.400"
        boxSize={badgeSize}
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }

  if (status === "disabled") {
    return (
      <AvatarBadge
        borderColor="gray.50"
        bg="gray.400"
        boxSize={badgeSize}
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }

  if (status === "maintenace") {
    return (
      <AvatarBadge
        borderColor="orange.50"
        bg="orange.400"
        boxSize={badgeSize}
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }
}
 */
