import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Input,
  List,
  RadioProps,
  SimpleGrid,
  Text,
  VStack,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface RadioCardProps extends RadioProps {
  children: ReactNode;
}

function RadioCard({ children, ...rest }: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio({ ...rest });

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        w="full"
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _hover={{
          bg: "purple.200",
        }}
        _checked={{
          bg: "purple.600",
          color: "white",

          borderColor: "purple.800",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
}

export function AvaliableEquipmentsList() {
  const [value, setValue] = useState("");

  const status = "stock";
  const { data } = useFetchInvetoryList({ status });

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "equipments_available",
    onChange: setValue,
  });

  return (
    <VStack {...getRootProps()}>
      {data?.equipments.map((equip) => {
        return (
          <RadioCard key={equip.id} {...getRadioProps({ value: equip.id })}>
            <Accordion allowToggle w="full">
              <AccordionItem>
                <AccordionButton color="black">
                  <HStack as="span" flex="1" textAlign="left" flexDir="row">
                    <Text fontWeight="semibold">{equip.type} - </Text>
                    <Text fontWeight="semibold">{equip.id}</Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing="2">
                    <List spacing="2">
                      <Input
                        value={`Departamento - ${equip.department.name}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Fabricante - ${equip.brand}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Modelo - ${equip.model}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Armazenamento  - ${equip.storage0_type}/ ${equip.storage0_syze}`}
                        readOnly
                        size="xs"
                      />
                    </List>

                    <List spacing="2">
                      <Input
                        value={`Placa de Video - ${equip.video}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Processador - ${equip.cpu}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Memória - ${equip.ram}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        value={`Armazenamento 1 - ${equip.storage1_type}/ ${equip.storage1_syze}`}
                        readOnly
                        size="xs"
                      />
                    </List>
                  </SimpleGrid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </RadioCard>
        );
      })}
    </VStack>
  );
}
