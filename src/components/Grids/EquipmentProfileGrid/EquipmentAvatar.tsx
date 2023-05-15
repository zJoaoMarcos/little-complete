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
  equipmentType: string;
  iconSize: number;
  avatarSize?: string;
}

export function EquipmentAvatar({
  equipmentType,
  avatarSize = "sm",
  iconSize,
}: EquipmentAvatarProps) {
  if (equipmentType === "Desktop") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<DesktopTower size={iconSize} />}
      />
    );
  } else if (equipmentType === "Monitor") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<Monitor size={iconSize} />}
      />
    );
  } else if (equipmentType === "Telephone") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<Phone size={iconSize} />}
      />
    );
  } else if (equipmentType === "Notebook") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<Laptop size={iconSize} />}
      />
    );
  } else if (equipmentType === "Vr") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<VirtualReality size={iconSize} />}
      />
    );
  } else if (equipmentType === "Scanner") {
    return (
      <Avatar
        size={avatarSize}
        bgColor="purple.400"
        icon={<Printer size={iconSize} />}
      />
    );
  }

  return <Avatar size={avatarSize} bgColor="purple.400" icon={<Desktop />} />;
}
