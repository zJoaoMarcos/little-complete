import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@/components/Layout";
import { EquipmentProfile } from "@/components/Profiles/EquipmentProfile";
import { getEquipment, useFindEquipment } from "@/hooks/useFindEquipment";

interface EquipmentProps {
  equipment: {
    id: string;
    status: string;
    currentUser: string | null;
    patrimony: string;
    type: string;
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
  };
}

export default function Inventory({ equipment }: EquipmentProps) {
  const { data } = useFindEquipment({
    equipmentId: equipment.id,
    options: {
      initialData: {
        ...equipment,
      },
    },
  });

  return (
    <>
      <Head>
        <title>Equipamento - {data?.id}</title>
      </Head>

      <EquipmentProfile equipment={data!} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async ({ params }) => {
  const id = params?.id;

  const equipment = await getEquipment(id as string);

  return {
    props: {
      equipment,
    },
  };
};

Inventory.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
