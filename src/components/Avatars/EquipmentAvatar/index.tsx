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
import { ReactNode } from "react";

interface EquipmentAvatarProps {
  type: string;
  iconSize?: string;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs";
  children?: ReactNode;
}

function equipmentIcon(type: string, iconSize: string) {
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

export function EquipmentAvatar({
  type,
  avatarSize = "sm",
  iconSize = "20",
  children,
}: EquipmentAvatarProps) {
  const icon = equipmentIcon(type, iconSize);

  return (
    <Avatar size={avatarSize} bgColor="purple.400" icon={icon}>
      {children && children}
    </Avatar>
  );
}

interface UserBadgeStatusProps {
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

interface EquipmentBadgeStatusProps {
  status: string;
}

export function EquipmentBagdeStatus({ status }: EquipmentBadgeStatusProps) {
  status = status?.trim();

  if (status === "avaliable") {
    return <Badge colorScheme="green">Disponivel</Badge>;
  }

  if (status === "disabled") {
    return <Badge colorScheme="blackAlpha">Sem Concerto</Badge>;
  }

  if (status === "maintenance") {
    return <Badge colorScheme="orange">Em Manutenção</Badge>;
  }

  if (status === "in use") {
    return <Badge colorScheme="blue">Em Uso</Badge>;
  }

  if (status === "pendency") {
    return <Badge colorScheme="red">Pendente</Badge>;
  }
}
