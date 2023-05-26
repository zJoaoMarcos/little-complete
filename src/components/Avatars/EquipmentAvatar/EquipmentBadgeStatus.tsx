import { Badge } from "@chakra-ui/react";

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

  return null;
}
