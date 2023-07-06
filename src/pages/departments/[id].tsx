import { Layout } from "@/components/Layout";
import { DepartmentProfile } from "@/components/Profiles/DepartmentProfile";
import { setupApiClient } from "@/services/apiClient";
import { formatData } from "@/utils/formatData";
import { withSSRAuth } from "@/utils/withSSRAuth";
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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);

  const { params } = ctx;
  const id = Number(params?.id);

  const { data } = await api.get<DepartmentProps>(`/departments/${id}`);

  const department = {
    id: data.department.id,
    name: formatData(data.department.name)!,
    cost_center: data.department.cost_center,
    is_board: data.department.is_board,
    board: data.department.board ? formatData(data.department.board) : null,
    responsible_id: data.department.responsible_id,
  };

  return {
    props: {
      department,
    },
  };
});

Department.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
