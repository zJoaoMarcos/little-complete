import { Badge } from "@chakra-ui/react";

interface UserBadgeStatusProps {
  status: string;
}

export function UserBagdeStatus({ status = "" }: UserBadgeStatusProps) {
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

  return <Badge colorScheme="yellow">verificar</Badge>;
}
