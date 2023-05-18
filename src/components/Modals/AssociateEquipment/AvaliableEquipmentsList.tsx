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
          bg: "purple.100",
        }}
        _checked={{
          bg: "purple.200",
          color: "black",
          borderColor: "purple.300",
        }}
        _focus={{
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
            <Accordion allowToggle>
              <AccordionItem border="none">
                <HStack as="span" flexDir="row" justifyContent="space-between">
                  <HStack>
                    <Text fontWeight="semibold">{equip.type} - </Text>
                    <Text>{equip.id}</Text>
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
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Departamento - ${equip.department.name}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Fabricante - ${equip.brand}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Modelo - ${equip.model}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Armazenamento  - ${equip.storage0_type}/ ${equip.storage0_syze}`}
                        readOnly
                        size="xs"
                      />
                    </List>

                    <List spacing="2">
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Placa de Video - ${equip.video}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Processador - ${equip.cpu}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
                        value={`Memória - ${equip.ram}`}
                        readOnly
                        size="xs"
                      />
                      <Input
                        borderColor="purple.400"
                        rounded={6}
                        _focus={{ border: "none" }}
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
