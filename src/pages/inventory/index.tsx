import { Layout } from "@/components/Layout";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { EquipmentListSkeleton } from "@/components/Lists/EquipmentsList/Skeleton";
import { Pagination } from "@/components/Pagination";
import { useEquipment } from "@/contexts/Inventory";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

export default function Inventory() {
  const { data, isLoading, isFetching, page, setPage, take } = useEquipment();

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Inventário</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <Heading as="h3" fontWeight="semibold">
          Inventário
          {!isLoading && isFetching && (
            <Spinner size="sm" color="white" ml="4" />
          )}
        </Heading>

        <Button colorScheme="purple" onClick={() => push("inventory/new")}>
          + Novo Equipamento
        </Button>
      </Flex>
      {isLoading && <EquipmentListSkeleton />}
      {data?.equipments && <EquipmentsList equipments={data.equipments} />}

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        registersPerPage={take}
        totalCountofRegisters={data?.totalCount!}
      />
    </>
  );
}

function EquipmentsLayout({ children }: { children: ReactNode }) {
  const { setSearch } = useEquipment();

  return <Layout setWords={setSearch}>{children}</Layout>;
}

Inventory.getLayout = function getLayout(children: ReactElement) {
  return <EquipmentsLayout>{children}</EquipmentsLayout>;
};
