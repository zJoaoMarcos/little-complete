import { Layout } from "@/components/Layout";
import { UserProfile } from "@/components/Profiles/UserProfile";
import { getUser, useFindUser } from "@/hooks/useFindUser";
import { withSSRAuth } from "@/utils/withSSRAuth";
import Head from "next/head";
import { ReactElement } from "react";

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number | null; name: string | null };
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

const User = ({ user, equipments }: UserProps) => {
  const { data } = useFindUser(user.user_name, {
    initialData: { user, equipments },
  });

  return (
    <>
      <Head>
        <title>{data?.user.user_name}</title>
      </Head>

      <UserProfile user={data?.user!} equipments={data?.equipments!} />
    </>
  );
};

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const { params } = ctx;

  const id = params?.id;

  const { user, equipments } = await getUser(id as string);

  return {
    props: {
      user,
      equipments,
    },
  };
});

User.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};

export default User;
