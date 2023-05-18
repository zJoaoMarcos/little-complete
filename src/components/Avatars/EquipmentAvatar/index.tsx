import { Avatar } from "@chakra-ui/react";
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
  iconSize?: string;
  avatarSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "2xs";
}

function generateAvatar(type: string, iconSize: string) {
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
}: EquipmentAvatarProps) {
  const icon = generateAvatar(type, iconSize);

  return <Avatar size={avatarSize} bgColor="purple.400" icon={icon} />;
}
