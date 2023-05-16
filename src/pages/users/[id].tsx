import { EquipmentProfileGrid } from "@/components/Grids/EquipmentProfileGrid";
import { UserProfileGrid } from "@/components/Grids/UserProfileGrid";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { getUser } from "@/hooks/UseFindUser";
import { concatFirstNameAndLastName } from "@/utils/concatFIrstNameAndLastName";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Desktop } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Equipment {
  id: string;
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
}

interface UserProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string;
  };

  equipments: Equipment[];
}

export default function User({ user, equipments }: UserProps) {
  const colorStatus = user.status === "active" ? "green" : "orange";

  return (
    <>
      <Head>
        <title>{user.user_name}</title>
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
                <Avatar
                  name={concatFirstNameAndLastName(user.complete_name)}
                  size="lg"
                />

                <VStack justify={"start"} alignItems="start">
                  <Heading as="h3" fontWeight="semibold" fontSize={18}>
                    {user.complete_name}
                  </Heading>

                  <Text fontWeight="semibold" fontSize={16}>
                    Status:{" "}
                    <Badge colorScheme={colorStatus}>{user.status}</Badge>
                  </Text>
                </VStack>
              </HStack>
            </Flex>

            <Divider />

            <UserProfileGrid user={user} />

            <>
              {equipments.map((equip) => (
                <Box key={equip.id}>
                  <Divider my="10" />
                  <HStack spacing={8}>
                    <Avatar size="md" icon={<Desktop size={30} />} />

                    <VStack justify={"start"} alignItems="start">
                      <Heading as="h3" fontWeight="semibold" fontSize={18}>
                        {equip.id}
                      </Heading>

                      <Text fontWeight="semibold" fontSize={16}>
                        Status:{" "}
                        <Badge colorScheme="green">{equip.status}</Badge>
                      </Text>
                    </VStack>
                  </HStack>

                  <EquipmentProfileGrid key={equip.id} equipment={equip} />
                </Box>
              ))}
            </>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  const id = params?.id;

  const { user, equipments } = await getUser(id as string);

  return {
    props: {
      user,
      equipments,
    },
  };
};
