import { Avatar, AvatarBadge, Badge } from "@chakra-ui/react";
import {
  Desktop,
  DesktopTower,
  Laptop,
  Monitor,
  Phone,
  Printer,
  VirtualReality,
} from "@phosphor-icons/react";

function avatarIcon(type: string, iconSize: string) {
  type = type.toLocaleLowerCase();

  if (type === "desktop") {
    return <DesktopTower size={iconSize} />;
  } else if (type === "monitor") {
    return <Monitor size={iconSize} />;
  } else if (type === "telephone") {
    return <Phone size={iconSize} />;
  } else if (type === "notebook") {
    return <Laptop size={iconSize} />;
  } else if (type === "vr") {
    return <VirtualReality size={iconSize} />;
  } else if (type === "scanner") {
    return <Printer size={iconSize} />;
  }
  return <Desktop size={iconSize} />;
}

function BadgeStatus(status: string) {
  if (status === "avaliable") {
    return <AvatarBadge borderColor="green.50" bg="green.300" boxSize="1em" />;
  } else if (status === "disabled") {
    return <AvatarBadge borderColor="red.50" bg="red.700" boxSize="1em" />;
  } else if (status === "in use") {
    return <AvatarBadge borderColor="blue" bg="blue.700" boxSize="1em" />;
  } else if (status === "maintenace") {
    return (
      <AvatarBadge borderColor="orange.50" bg="orange.400" boxSize="1em" />
    );
  }
  return <AvatarBadge borderColor="yellow.50" bg="yellow.400" boxSize="1em" />;
}

interface EquipmentAvatarProps {
  type: string;
  iconSize?: string;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs";
  avatarBadge?: string;
}

export function EquipmentAvatar({
  type,
  avatarSize = "sm",
  iconSize = "20",
  avatarBadge = "",
}: EquipmentAvatarProps) {
  const icon = avatarIcon(type, iconSize);

  return (
    <Avatar size={avatarSize} bgColor="purple.400" icon={icon}>
      {BadgeStatus(avatarBadge)}
    </Avatar>
  );
}

interface EquipmentBadgeStatusProps {
  status: string;
}

export function EquipmentBagdeStatus({
  status = "",
}: EquipmentBadgeStatusProps) {
  if (status === "avaliable") {
    return <Badge colorScheme="green">Disponivel</Badge>;
  } else if (status === "disabled") {
    return <Badge colorScheme="red">Sem Concerto</Badge>;
  } else if (status === "maintenance") {
    return <Badge colorScheme="orange">Em Manutenção</Badge>;
  } else if (status === "in use") {
    return <Badge colorScheme="blue">Em Uso</Badge>;
  }

  return <Badge colorScheme="yellow">Verificar</Badge>;
}
