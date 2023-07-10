import { VStack, useRadioGroup } from "@chakra-ui/react";

import { EquipmentAcordion } from "./EquipmentAccordion";
import { EquipmentRadioCard } from "./EquipmentRadioCard";
import { EquipmentRadioGroupProps } from "./types";

export function EquipmentRadioGroup({
  setValue,
  equipments,
}: EquipmentRadioGroupProps) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "equipments_available",
    onChange: setValue,
  });

  return (
    <VStack {...getRootProps()}>
      {equipments?.map((equip) => {
        return (
          <EquipmentRadioCard
            key={equip.id}
            {...getRadioProps({ value: equip.id })}
          >
            <EquipmentAcordion equipment={equip} />
          </EquipmentRadioCard>
        );
      })}
    </VStack>
  );
}
