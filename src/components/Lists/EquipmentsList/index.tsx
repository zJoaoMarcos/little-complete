import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
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
  columns = 2,
}: EquipmentListProps) {
  return (
    <SimpleGrid columns={columns} spacingX={10} spacingY={6} mb={10} w="full">
      <>
        {equipments ? (
          equipments.map((equipment) => (
            <EquipmentCard
              key={equipment.id}
              equipment={equipment}
              buttonUnassign={buttonUnassign}
            />
          ))
        ) : (
          <Stack w="full">
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}
      </>
    </SimpleGrid>
  );
}
