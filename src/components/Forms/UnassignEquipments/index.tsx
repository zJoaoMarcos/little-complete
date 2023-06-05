import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { useEquipment } from "@/contexts/Inventory";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";

interface Equipment {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
}

interface Props {
  equipments: Equipment[];
  username: string;
  goToNext: () => void;
}

export function UnassignEquipmentsForm({
  username,
  equipments,
  goToNext,
}: Props) {
  const { unassignAllEquipments } = useEquipment();

  const handleUnassign = async () => {
    await unassignAllEquipments.mutateAsync({ username });
  };

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
