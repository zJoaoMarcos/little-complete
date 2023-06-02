import { Layout } from "@/components/Layout";
import { EquipmentProfile } from "@/components/Profiles/EquipmentProfile";
import { getEquipment, useFindEquipment } from "@/hooks/UseFindEquipment";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement } from "react";

interface EquipmentProps {
  equipment: {
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
  };
}

export default function Inventory({ equipment }: EquipmentProps) {
  const { data } = useFindEquipment(equipment.id, {
    options: {
      initialData: equipment,
    },
  });

  return (
    <>
      <Head>
        <title>Equipment</title>
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

  console.log(equipment.id);

  return {
    props: {
      equipment: equipment,
    },
  };
};

Inventory.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
