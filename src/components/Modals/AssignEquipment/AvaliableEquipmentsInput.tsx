import { EquipmentAvatar } from "@/components/Avatars/EquipmentAvatar";
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
import { Dispatch, ReactNode, SetStateAction } from "react";

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

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
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
  setValue: Dispatch<SetStateAction<string>>;
  equipments: Equipment[];
}

export function AvaliableEquipmentsInput({ setValue, equipments }: Props) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "equipments_available",
    onChange: setValue,
  });

  return (
    <VStack {...getRootProps()}>
      {equipments.map((equip) => {
        return (
          <RadioCard key={equip.id} {...getRadioProps({ value: equip.id })}>
            <Accordion allowToggle>
              <AccordionItem border="none">
                <HStack as="span" flexDir="row" justifyContent="space-between">
                  <HStack>
                    <EquipmentAvatar
                      type={equip.type}
                      avatarSize="sm"
                      iconSize="20"
                    />
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
