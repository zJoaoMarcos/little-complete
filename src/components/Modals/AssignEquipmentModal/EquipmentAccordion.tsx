import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  List,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { EquipmentDetail } from "./EquipmentDetail";
import { EquipmentAccordionProps } from "./types";

export function EquipmentAcordion({ equipment }: EquipmentAccordionProps) {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <HStack as="span" flexDir="row" justifyContent="space-between">
          <HStack>
            <EquipmentAvatar
              type={equipment.type}
              avatarSize="sm"
              iconSize="20"
            />
            <Text fontWeight="semibold">{equipment.type} - </Text>
            <Text>{equipment.id}</Text>
          </HStack>

          <AccordionButton
            color="black"
            display="flex"
            w="10"
            alignItems="center"
            justifyContent="center"
            rounded="md"
          >
            <AccordionIcon />
          </AccordionButton>
        </HStack>

        <AccordionPanel w="full">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2">
            <List spacing="2">
              <EquipmentDetail
                label="Departamento"
                value={equipment.department.name}
              />

              <EquipmentDetail label="Modelo" value={equipment.model} />

              <EquipmentDetail
                label={equipment.config.storage.storage0Type}
                value={equipment.config.storage.storage0Syze}
              />
            </List>

            <List spacing="2">
              <EquipmentDetail
                label="Placa de Video"
                value={equipment.config.video}
              />
              <EquipmentDetail
                label="Processador"
                value={equipment.config.cpu}
              />
              <EquipmentDetail label="Memória" value={equipment.config.ram} />
              <EquipmentDetail
                label={equipment.config.storage.storage1Type}
                value={equipment.config.storage.storage1Syze}
              />
            </List>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
