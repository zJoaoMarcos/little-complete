import { Badge } from "@chakra-ui/react";

interface UserStatusBadgeProps {
  status: string;
}

export function UserStatusBadge({ status = "" }: UserStatusBadgeProps) {
  if (status === "active") {
    return <Badge colorScheme="green">Ativo</Badge>;
  }

  if (status === "vacation") {
    return <Badge colorScheme="orange">Férias/Afastado</Badge>;
  }

  if (status === "pendency") {
    return <Badge colorScheme="red">Pendente</Badge>;
  }

  if (status === "disabled") {
    return <Badge colorScheme="blackAlpha">Desligado</Badge>;
  }

  return <Badge colorScheme="yellow">Verificar</Badge>;
}
