import {
  EquipmentAvatar,
  EquipmentBagdeStatus,
} from "@/components/Avatars/EquipmentAvatar";
import { EquipmentProfileGrid } from "@/components/Grids/EquipmentProfileGrid";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getEquipment } from "@/hooks/UseFindEquipment";
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface EquipmentProps {
  equipment: {
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
  };
}

export default function Inventory({ equipment }: EquipmentProps) {
  return (
    <>
      <Head>
        <title>Equipment</title>
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
                <EquipmentAvatar
                  type={equipment.type}
                  avatarSize="lg"
                  iconSize="40"
                />
                <VStack justify={"start"} alignItems="start">
                  <Heading as="h3" fontWeight="semibold" fontSize={18}>
                    {equipment.type} -{" "}
                    <Text as="span" color="purple.400">
                      {equipment.id}
                    </Text>
                  </Heading>

                  <Text fontWeight="semibold" fontSize={16}>
                    Status:{" "}
                    <EquipmentBagdeStatus status={equipment.status || ""} />
                  </Text>
                </VStack>
              </HStack>
            </Flex>

            <Divider />

            <EquipmentProfileGrid equipment={equipment} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug;

  const equipment = await getEquipment(slug as string);

  return {
    props: {
      equipment: equipment.equipment,
    },
  };
};
