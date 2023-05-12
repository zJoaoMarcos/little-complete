import { EquipmentProfileGrid } from "@/components/Grids/EquipmentProfileGrid";
import { EquipmentAvatar } from "@/components/Grids/EquipmentProfileGrid/EquipmentAvatar";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getEquipment } from "@/hooks/UseFindEquipment";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Archive, Pencil, X } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";

interface EquipmentProps {
  equipment: {
    id: string;
    type: string | null;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: { id: number; name: string };
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
  const [isBlocked, setIsBlocked] = useState(true);

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
                  equipmentType={equipment.type}
                  avatarSize="lg"
                  iconSize={40}
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
                    <Badge colorScheme="green">{equipment.status}</Badge>
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <Button
                  onClick={() => setIsBlocked(!isBlocked)}
                  leftIcon={isBlocked ? <Pencil /> : <X />}
                  colorScheme={isBlocked ? "purple" : "red"}
                >
                  {isBlocked ? "Editar" : "Cancelar"}
                </Button>

                <Button
                  form="update_equipment"
                  type="submit"
                  hidden={isBlocked}
                  leftIcon={<Archive />}
                  colorScheme="blue"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>

            <Divider />

            <EquipmentProfileGrid
              setIsBlocked={() => setIsBlocked(!isBlocked)}
              equipment={equipment}
              isBlocked={isBlocked}
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;

  const equipment = await getEquipment(slug as string);

  return {
    props: {
      equipment: equipment.equipment,
    },
  };
};
