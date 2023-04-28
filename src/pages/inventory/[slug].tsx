import { Header } from "@/components/Header";
import { UpdateEquipmentTrigger } from "@/components/Modals/Equipment/UpdateEquipment/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { getOneEquipment, useOneEquipment } from "@/hooks/UseOneEquipment";
import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface EquipmentProps {
  equipment: {
    id: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: string | null;
    department: string;
    status: string;
    cpu: string | null;
    ram: string | null;
    slots: number | null;
    storage0_type: string | null;
    storage0_syze: number | null;
    storage1_type: string | null;
    storage1_syze: number | null;
    video: string | null;
    service_tag: string | null;
  };
}

export default function User({ equipment }: EquipmentProps) {
  const { data } = useOneEquipment(equipment.id, { initialData: equipment });

  return (
    <>
      <Head>
        <title>{equipment.id} | Equipment</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Box
            flex="1"
            h="full"
            p="8"
            bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
            overflowX="auto"
            borderRadius="md"
          >
            <Flex mb="10" justify="space-between" align="center">
              <HStack spacing={8}>
                <VStack justify={"start"} alignItems="start">
                  <Heading as="h3" fontWeight="semibold" fontSize={18}>
                    {data.equipment.id}
                  </Heading>

                  <Text fontWeight="semibold" fontSize={16}>
                    Status:{" "}
                    <Badge colorScheme="green">{data.equipment.status}</Badge>
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <UpdateEquipmentTrigger equipment={data.equipment} />
              </HStack>
            </Flex>

            <Divider />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={8}>
              <List spacing={6}>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    ID:
                  </Text>{" "}
                  {data.equipment.id}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Fabricante:
                  </Text>{" "}
                  {data.equipment.brand}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Modelo:
                  </Text>{" "}
                  {data.equipment.model}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Processador:
                  </Text>{" "}
                  {data.equipment.cpu}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Memória Ram:
                  </Text>{" "}
                  {data.equipment.ram}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Slots:
                  </Text>{" "}
                  {data.equipment.slots}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Tipo de Armazenamento (1):
                  </Text>{" "}
                  {data.equipment.storage0_type}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Tamanho do Armazenamento (1):
                  </Text>{" "}
                  {data.equipment.storage0_syze}
                </ListItem>
              </List>

              <List spacing={6}>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Departamento:
                  </Text>{" "}
                  {data.equipment.department}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Data de Compra:
                  </Text>{" "}
                  {data.equipment.purchase_date}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Garantia:
                  </Text>{" "}
                  {data.equipment.warranty}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Placa de Video:
                  </Text>{" "}
                  {data.equipment.video}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Service Tag:
                  </Text>{" "}
                  {data.equipment.service_tag}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    N° da NF:
                  </Text>{" "}
                  {data.equipment.invoice}
                </ListItem>

                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Tipo de Armazenamento (2):
                  </Text>{" "}
                  {data.equipment.storage1_type}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Tamanho do Armazenamento (2):
                  </Text>{" "}
                  {data.equipment.storage1_syze}
                </ListItem>
              </List>
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;

  const equipment = await getOneEquipment(slug as string);

  return {
    props: {
      equipment: equipment,
    },
  };
};
