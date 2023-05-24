import { Header } from "@/components/Header";
import { UserProfile } from "@/components/Profiles/UserProfile";
import { Sidebar } from "@/components/Sidebar";
import { getUser } from "@/hooks/UseFindUser";
import { Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Equipment {
  id: string;
  type: string;
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
  const isPendency = user.status === "pendency";

  return (
    <>
      <Head>
        <title>{user.user_name}</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
          <Sidebar />
          {isPendency ? (
            <Text>Está Pendente</Text>
          ) : (
            <UserProfile user={user} equipments={equipments} />
          )}
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
