import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";

interface Equipment {
  id: string;
  type: string;
  brand: string | null;
  model: string | null;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: {
    id: number | null;
    name: string | null;
  };
  status: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
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
          <Button colorScheme="purple">Desatribuir todos</Button>
        )}

        <Button colorScheme="purple" type="button" onClick={() => goToNext()}>
          Próximo Passo
        </Button>
      </HStack>
    </Flex>
  );
}
