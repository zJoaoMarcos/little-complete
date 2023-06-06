import { Badge } from "@chakra-ui/react";

interface EquipmentBadgeStatusProps {
  status: string | null;
}

export function EquipmentBagdeStatus({ status }: EquipmentBadgeStatusProps) {
  if (status === "available") {
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

  return <Badge colorScheme="orange">VERIFICAR</Badge>;
}
