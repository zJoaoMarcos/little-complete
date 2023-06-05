import { Select } from "@/components/Form/Select";
import { Layout } from "@/components/Layout";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { EquipmentListSkeleton } from "@/components/Lists/EquipmentsList/Skeleton";
import { Pagination } from "@/components/Pagination";
import { useEquipment } from "@/contexts/Inventory";
import { Button, Flex, HStack, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

export default function Inventory() {
  const { data, isLoading, isFetching, setFilter, page, setPage, take } =
    useEquipment();

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Inventário</title>
      </Head>

      <Flex mb="8" justify="space-between" align="center">
        <HStack alignItems="center" justifyContent="center" spacing={"14"}>
          <Heading as="h3" fontWeight="semibold">
            Inventário
            {!isLoading && isFetching && (
              <Spinner size="sm" color="white" ml="4" />
            )}
          </Heading>
          <Select
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
            variant="unstyled"
            _hover={{ bg: "none" }}
            _placeholder={{ mt: "2px" }}
            size="sm"
          >
            {defaultOptions.map((item, i) => {
              return (
                <option key={i} value={item.value}>
                  {item.option}
                </option>
              );
            })}
          </Select>
        </HStack>

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

const defaultOptions = [
  {
    value: "",
    option: "Todos",
  },
  {
    value: "avaliable",
    option: "Disponivel",
  },
  {
    value: "in use",
    option: "Em Uso",
  },
  {
    value: "borrowed",
    option: "Empréstimo",
  },
  {
    value: "maintenance",
    option: "Manutenção",
  },
  {
    value: "disabled",
    option: "Em Descarte",
  },
];

function EquipmentsLayout({ children }: { children: ReactNode }) {
  const { setSearch } = useEquipment();

  return <Layout setWords={setSearch}>{children}</Layout>;
}

Inventory.getLayout = function getLayout(children: ReactElement) {
  return <EquipmentsLayout>{children}</EquipmentsLayout>;
};
