import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { Button, Flex, Text } from "@chakra-ui/react";

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
}

export function UnassignEquipmentsForm({ username, equipments }: Props) {
  return (
    <Flex
      as="form"
      flexDir="column"
      mt="10"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="semibold" mb="4">
        Equipametos para retirar:
      </Text>
      <EquipmentsList
        equipments={equipments}
        buttonUnassign={true}
        columns={1}
      />

      <Button colorScheme="purple">Desatribuir todos</Button>
    </Flex>
  );
}
