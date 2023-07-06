import { Layout } from "@/components/Layout";
import { UserProfile } from "@/components/Profiles/UserProfile";
import { useFindUser } from "@/hooks/useFindUser";
import { setupApiClient } from "@/services/apiClient";
import { formatData } from "@/utils/formatData";
import { withSSRAuth } from "@/utils/withSSRAuth";
import Head from "next/head";
import { ReactElement } from "react";

interface Equipment {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
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
  const api = setupApiClient(ctx);

  const { params } = ctx;
  const id = params?.id;

  const { data } = await api.get<UserProps>(`users/${id}`);

  const user = {
    user_name: data.user.user_name.trim(),
    complete_name: formatData(data.user.complete_name)!,
    title: formatData(data.user.title)!,
    department: {
      id: data.user.department.id,
      name: formatData(data.user.department.name)!,
    },
    telephone: data.user.telephone ? data.user.telephone : null,
    direct_boss: data.user.direct_boss,
    smtp: data.user.smtp.trim(),
    admission_date: data.user.admission_date,
    demission_date: data.user.demission_date,
    status: data.user.status.trim().toLocaleLowerCase(),
  };

  const equipments = data.equipments.map((equipment) => {
    return {
      id: equipment.id,
      status: equipment.status?.trim(),
      currentUser: equipment.currentUser,
      patrimony: equipment.patrimony,
      type: formatData(equipment.type),
      brand: formatData(equipment.brand),
      model: equipment.model,
      serviceTag: equipment.serviceTag,
      department: {
        id: equipment.department.id,
        name: formatData(equipment.department.name),
      },
      purchase: {
        warranty: equipment.purchase.warranty,
        invoice: equipment.purchase.invoice,
        supplier: equipment.purchase.supplier,
        purchaseDate: equipment.purchase.purchaseDate,
      },
      config: {
        cpu: equipment.config.cpu,
        ram: formatData(equipment.config.ram),
        video: equipment.config.video,
        storage: {
          slots: equipment.config.storage.slots,
          storage0Type: equipment.config.storage.storage0Type,
          storage0Syze: equipment.config.storage.storage0Syze,
          storage1Type: equipment.config.storage.storage1Type,
          storage1Syze: equipment.config.storage.storage1Syze,
        },
      },
    };
  });

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
