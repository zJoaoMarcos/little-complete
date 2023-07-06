import Head from "next/head";
import { ReactElement } from "react";

import { Layout } from "@/components/Layout";
import { EquipmentProfile } from "@/components/Profiles/EquipmentProfile";
import { useFindEquipment } from "@/hooks/useFindEquipment";
import { Equipment } from "@/hooks/useFindEquipment/types";
import { setupApiClient } from "@/services/apiClient";
import { formatData } from "@/utils/formatData";
import { withSSRAuth } from "@/utils/withSSRAuth";

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);

  const { params } = ctx;
  const id = params?.id;

  const { data } = await api.get<Equipment>(`/equipments/${id}`);

  const equipment = {
    id: data.id,
    status: data.status.trim(),
    currentUser: data.currentUser,
    patrimony: data.patrimony,
    type: formatData(data.type)!,
    brand: formatData(data.brand),
    model: formatData(data.model),
    serviceTag: data.serviceTag,
    purchase: {
      warranty: data.purchase.warranty,
      invoice: data.purchase.invoice,
      supplier: data.purchase.supplier,
      purchaseDate: data.purchase.purchaseDate,
    },
    department: {
      id: data.department.id,
      name: formatData(data.department.name),
    },
    config: {
      cpu: data.config.cpu,
      ram: formatData(data.config.ram),
      video: data.config.video,
      storage: {
        slots: data.config.storage.slots,
        storage0Type: data.config.storage.storage0Type,
        storage0Syze: data.config.storage.storage0Syze,
        storage1Type: data.config.storage.storage1Type,
        storage1Syze: data.config.storage.storage1Syze,
      },
    },
  };

  return {
    props: {
      equipment,
    },
  };
});

Inventory.getLayout = function getLayout(children: ReactElement) {
  return <Layout>{children}</Layout>;
};
