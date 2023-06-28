import { Divider } from "@chakra-ui/react";

import { UdpateEquipmentDataForm } from "@/components/Forms/UpdateEquipmentDataForm";
import { Header } from "./Header";
import { EquipmentProfileProps } from "./types";

export function EquipmentProfile({ equipment }: EquipmentProfileProps) {
  return (
    <>
      <Header equipment={equipment} />

      <Divider />

      <UdpateEquipmentDataForm equipment={equipment!} />
    </>
  );
}
