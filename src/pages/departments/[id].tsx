import { Header } from "@/components/Header";
import { DepartmentProfile } from "@/components/Profiles/DepartmentProfile";
import { Sidebar } from "@/components/Sidebar";
import { getDepartment } from "@/hooks/UseFetchDepartment";
import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface DepartmentProps {
  department: {
    id: number;
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
    responsible_id: string;
  };
}

export default function Department({ department }: DepartmentProps) {
  return (
    <>
      <Head>
        <title> Profile</title>
      </Head>

      <Flex flexDir="column" h="100vh">
        <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" pb="10">
          <Sidebar />

          <DepartmentProfile department={department} />
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  const id = Number(params?.id);

  const { department } = await getDepartment(id);

  return {
    props: {
      department,
    },
  };
};
