import { Avatar, AvatarBadge, Badge } from "@chakra-ui/react";

interface UserAvatarProps {
  name: string;
  status?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "full";
}

export function UserAvatar({
  name,
  status = "",
  size = "md",
}: UserAvatarProps) {
  return (
    <Avatar size={size} name={name}>
      {BadgeStatus(status)}
    </Avatar>
  );
}

function BadgeStatus(status: string) {
  if (status === "active") {
    return (
      <AvatarBadge
        borderColor="green.50"
        bg="green.300"
        boxSize="0.80em"
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  } else if (status === "disabled") {
    return (
      <AvatarBadge
        borderColor="red.50"
        bg="red.700"
        boxSize="0.80em"
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  } else if (status === "vacation") {
    return (
      <AvatarBadge
        borderColor="orange.50"
        bg="orange.400"
        boxSize="0.80em"
        border="2px"
        mr="1"
        mb="0.2px"
      />
    );
  }
  return (
    <AvatarBadge
      borderColor="yellow.50"
      bg="yellow.400"
      boxSize="0.80em"
      border="2px"
      mr="1"
      mb="0.2px"
    />
  );
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
