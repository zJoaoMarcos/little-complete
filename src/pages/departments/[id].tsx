import { Layout } from "@/components/Layout";
import { DepartmentProfile } from "@/components/Profiles/DepartmentProfile";
import { getDepartment } from "@/hooks/useFindDepartment";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

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

      <DepartmentProfile department={department} />
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

Department.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
