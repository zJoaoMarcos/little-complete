import { Button, Flex, HStack, Text } from "@chakra-ui/react";

import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { useUnassignAllEquipments } from "./hooks/useUnassignAllEquipments";
import { UnassignAllEquipmentsProps } from "./types";

export function UnassignEquipmentsForm({
  username,
  equipments,
}: UnassignAllEquipmentsProps) {
  const { handleUnassign } = useUnassignAllEquipments(username);

  return (
    <Flex
      as="form"
      flexDir="column"
      justifyContent="space-between"
      w="full"
      p="4"
    >
      {equipments.length === 0 ? (
        <Text>Usuário não tem equipamentos atribuidos</Text>
      ) : (
        <EquipmentsList
          equipments={equipments}
          buttonUnassign={true}
          columns={1}
        />
      )}

      <HStack ml="auto">
        {equipments.length > 1 && (
          <Button onClick={handleUnassign} colorScheme="purple">
            Desatribuir todos
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
