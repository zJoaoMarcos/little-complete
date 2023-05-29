import { Layout } from "@/components/Layout";
import { EquipmentProfile } from "@/components/Profiles/EquipmentProfile";
import { getEquipment, useFindEquipment } from "@/hooks/UseFindEquipment";
import { GetServerSideProps } from "next";
import Head from "next/head";

interface EquipmentProps {
  equipment: {
    id: string;
    type: string;
    brand: string;
    model: string;
    supplier: string | null;
    invoice: string | null;
    warranty: string | null;
    purchase_date: Date | null;
    department: {
      id: number | null;
      name: string | null;
    };
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
  };
}

export default function Inventory({ equipment }: EquipmentProps) {
  const { data } = useFindEquipment(equipment.id, {
    initialData: { equipment },
  });

  return (
    <>
      <Head>
        <title>Equipment</title>
      </Head>

      <Layout>
        <EquipmentProfile equipment={data?.equipment!} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  { slug: string }
> = async ({ params }) => {
  const slug = params?.slug;

  const equipment = await getEquipment(slug as string);

  return {
    props: {
      equipment: equipment.equipment,
    },
  };
};
