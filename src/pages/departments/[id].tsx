import { Layout } from "@/components/Layout";
import { DepartmentProfile } from "@/components/Profiles/DepartmentProfile";
import { getDepartment } from "@/hooks/UseFetchDepartment";
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

      <Layout>
        <DepartmentProfile department={department} />
      </Layout>
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
