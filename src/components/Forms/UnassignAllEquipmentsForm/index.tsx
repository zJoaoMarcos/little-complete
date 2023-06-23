import { Button, Flex, HStack, Text } from "@chakra-ui/react";

import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { useUnassignAllEquipments } from "./hooks/useUnassignAllEquipments";
import { UnassignAllEquipmentsProps } from "./types";

export function UnassignEquipmentsForm({
  username,
  equipments,
  goToNext,
}: UnassignAllEquipmentsProps) {
  const { handleUnassign } = useUnassignAllEquipments(username);

  return (
    <Flex
      as="form"
      flexDir="column"
      mt="10"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="semibold" my="10" mr="auto" fontSize="xl">
        Equipametos para retirar:
      </Text>
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
        {equipments.length >= 1 && (
          <Button onClick={() => handleUnassign()} colorScheme="purple">
            Desatribuir todos
          </Button>
        )}

        <Button colorScheme="purple" type="button" onClick={() => goToNext()}>
          Próximo Passo
        </Button>
      </HStack>
    </Flex>
  );
}
