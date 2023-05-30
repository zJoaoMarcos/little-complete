import { Layout } from "@/components/Layout";
import { EquipmentsList } from "@/components/Lists/EquipmentsList";
import { Pagination } from "@/components/Pagination";
import useDebounce from "@/hooks/UseDebounce";
import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Inventory() {
  const [words, setWords] = useState<string>("");
  const debouncedWords = useDebounce(words, 500);
  const [page, setPage] = useState<number>(1);
  const take = 26;
  const skip = (page - 1) * take;
  const { data, isLoading, isFetching } = useFetchInvetoryList({
    page,
    skip,
    take,
    id: debouncedWords,
  });

  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Inventário</title>
      </Head>

      <Layout setWords={setWords}>
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
        {isLoading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <EquipmentsList equipments={data?.equipments!} />
        )}

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          registersPerPage={take}
          totalCountofRegisters={data?.totalCount!}
        />
      </Layout>
    </>
  );
}
