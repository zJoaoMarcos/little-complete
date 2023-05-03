import { EquipmentProfileGrid } from "@/components/Grids/EquipmentProfileGrid";
import { Header } from "@/components/Header";
import { UpdateEquipmentTrigger } from "@/components/Modals/Equipment/UpdateEquipment/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { getOneEquipment, useOneEquipment } from "@/hooks/UseOneEquipment";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Desktop } from "@phosphor-icons/react";
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

export default function Inventory({ equipment }: EquipmentProps) {
  const { data } = useOneEquipment(equipment.id, { initialData: equipment });

  return (
    <>
      <Head>
        <title>{equipment.id} | Equipment</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
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
                <Avatar size="xl" icon={<Desktop size={50} />} />

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

            <EquipmentProfileGrid equipment={data.equipment} />
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
