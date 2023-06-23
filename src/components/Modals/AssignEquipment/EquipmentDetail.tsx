import { HStack, Text } from "@chakra-ui/react";

import { EquipmentDetailProps } from "./types";

export function EquipmentDetail({ label, value }: EquipmentDetailProps) {
  return (
    <HStack fontSize="xs">
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}
