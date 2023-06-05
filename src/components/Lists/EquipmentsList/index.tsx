import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Warning } from "@phosphor-icons/react";
import { EquipmentCard } from "./EquipmentCard";

interface EquipmentProps {
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

interface EquipmentListProps {
  equipments: EquipmentProps[] | undefined;
  buttonUnassign?: boolean;
  columns?: number;
}

export function EquipmentsList({
  equipments,
  buttonUnassign = false,
}: EquipmentListProps) {
  const columns = equipments?.length! >= 12 ? 2 : 1;
  return (
    <SimpleGrid columns={columns} spacingX={10} spacingY={6} mb={10} w="full">
      <>
        {equipments &&
          equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              buttonUnassign={buttonUnassign}
            />
          ))}

        {equipments?.length === 0 && (
          <Flex
            w="full"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mt="20"
          >
            <Warning color="purple" size={100} />
            <Text>
              Infelizmente não conseguimos achar nenhum equipamento, tente mais
              tarde.
            </Text>
          </Flex>
        )}
      </>
    </SimpleGrid>
  );
}
