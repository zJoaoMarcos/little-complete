import { UserProfileGrid } from "@/components/Grids/UserProfileGrid";
import { Header } from "@/components/Header";
import { TriggerChangeDepartment } from "@/components/Modals/User/ChangeDepartment/Trigger";
import { TriggerChangeStatus } from "@/components/Modals/User/ChangeStatus/Trigger";
import { Sidebar } from "@/components/Sidebar";
import { getOneUser } from "@/hooks/UseOneUser";
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
  const colorStatus = user.status === "active" ? "green" : "orange";

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

            <UserProfileGrid user={user} />
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
