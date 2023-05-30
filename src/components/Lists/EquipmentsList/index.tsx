import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Warning } from "@phosphor-icons/react";
import { EquipmentCard } from "./EquipmentCard";

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

interface EquipmentListProps {
  equipments: Equipment[] | undefined;
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
