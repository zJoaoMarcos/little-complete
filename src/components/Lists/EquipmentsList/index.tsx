import { SimpleGrid } from "@chakra-ui/react";
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
  equipments: Equipment[];
}

export function EquipmentsList({ equipments }: EquipmentListProps) {
  return (
    <SimpleGrid columns={2} spacingX={10} spacingY={6} mb={10}>
      <>
        {equipments.map((equipment) => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </>
    </SimpleGrid>
  );
}
