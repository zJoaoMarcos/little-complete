import { Header } from "@/components/Header";
import { TriggerChangeDepartment } from "@/components/Modals/User/ChangeDepartment/Trigger";
import { TriggerChangeStatus } from "@/components/Modals/User/ChangeStatus/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { getOneUser } from "@/hooks/UseOneUser";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface UserProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department_id: string;
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: string;
    demission_date: string | null;
    status: string;
  };
}

export default function User({ user }: UserProps) {
  return (
    <>
      <Head>
        <title> Profile</title>
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
                <Avatar name={user.user_name} size="lg" />

                <VStack justify={"start"} alignItems="start">
                  <Heading as="h3" fontWeight="semibold" fontSize={18}>
                    {user.complete_name}
                  </Heading>

                  <Text fontWeight="semibold" fontSize={16}>
                    Status: <Badge colorScheme="green">{user.status}</Badge>
                  </Text>
                </VStack>
              </HStack>

              <HStack>
                <TriggerChangeDepartment
                  userName={user.user_name}
                  title={user.title}
                  departmentId={user.department_id}
                  directBoss={user.direct_boss}
                />
                <TriggerChangeStatus
                  userName={user.user_name}
                  currentStatus={user.status}
                />
              </HStack>
            </Flex>

            <Divider />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={8}>
              <List spacing={6}>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Usuário:
                  </Text>{" "}
                  {user.user_name}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Cargo:
                  </Text>{" "}
                  {user.title}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Departamento:
                  </Text>{" "}
                  {user.department_id}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Chefia Imediata:
                  </Text>{" "}
                  {user.direct_boss}
                </ListItem>
              </List>

              <List spacing={6}>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    E-mail:
                  </Text>{" "}
                  {user.smtp}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Ramal:
                  </Text>{" "}
                  {user.telephone}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Data de Admissão:
                  </Text>{" "}
                  {String(user.admission_date)}
                </ListItem>
                <ListItem>
                  {" "}
                  <Text as={"span"} fontWeight={"bold"}>
                    Data de Demissão:
                  </Text>{" "}
                  {user.demission_date === null
                    ? " - / / - "
                    : user.demission_date}
                </ListItem>
              </List>
            </SimpleGrid>
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
  const id = params.id;

  const { user } = await getOneUser(id);

  return {
    props: {
      user,
    },
  };
};
