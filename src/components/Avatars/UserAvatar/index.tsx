import { Avatar, AvatarBadge, Badge } from "@chakra-ui/react";

interface UserAvatar {
  name: string;
  status?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "full";
}

export function UserAvatar({ name, status = "", size = "md" }: UserAvatar) {
  return (
    <Avatar size={size} name={name}>
      {BadgeStatus(status)}
    </Avatar>
  );
}

function BadgeStatus(status: string) {
  if (status === "active") {
    return <AvatarBadge borderColor="green.50" bg="green.300" boxSize="1em" />;
  } else if (status === "disabled") {
    return <AvatarBadge borderColor="red.50" bg="red.700" boxSize="1em" />;
  } else if (status === "vacation") {
    return (
      <AvatarBadge borderColor="orange.50" bg="orange.400" boxSize="1em" />
    );
  }
  return <AvatarBadge borderColor="yellow.50" bg="yellow.400" boxSize="1em" />;
}
interface UserBadgeStatusProps {
  status: string;
}

export function UserBagdeStatus({ status = "" }: UserBadgeStatusProps) {
  if (status === "active") {
    return <Badge colorScheme="green">Ativo</Badge>;
  } else if (status === "disabled") {
    return <Badge colorScheme="red">Desligado</Badge>;
  } else if (status === "vacation") {
    return <Badge colorScheme="orange">Férias/Afastado</Badge>;
  }

  return <Badge colorScheme="yellow">verificar</Badge>;
}
