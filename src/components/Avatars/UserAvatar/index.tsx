import { Avatar, AvatarBadge } from "@chakra-ui/react";

interface UserAvatarProps {
  name: string;
  status?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs" | "full";
}

export function UserAvatar({ name, status, size = "md" }: UserAvatarProps) {
  return (
    <Avatar size={size} name={name}>
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

function statusColor(status: string) {
  if (status === "active") {
    return "green.400";
  }

  if (status === "disabled") {
    return "gray.700";
  }

  if (status === "vacation") {
    return "orange.400";
  }

  if (status === "pendency") {
    return "red.600";
  }
}
