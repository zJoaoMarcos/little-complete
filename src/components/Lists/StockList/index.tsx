import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";

import { StockItemCard } from "@/components/Cards/StockItemCard";
import { StockListProps } from "./types";

export function StockList({ stockList }: StockListProps) {
  /*  const handlePrefetchItems = async (type: string) => {
    await queryClient.prefetchQuery(
      ["stockItems", type],
      async () => {
        const { data } = await backend.get<StockItem[]>(
          `stock/items?type=${type}`
        );

        return data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }; */

  console.log(stockList);
  return (
    <Accordion allowMultiple w="full">
      <>
        {stockList.map((group) => {
          return (
            <AccordionItem key={group.id}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <HStack
                      spacing={20}
                      justifyContent="space-between"
                      alignItems="center"
                      p="2"
                    >
                      <Text>Tipo: {group.itemType}</Text>
                      <Text>Qtd: {group.amount}</Text>
                      <Text>Qtd. Min: {group.amountMin}</Text>
                    </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel
                pb={4}
                display="flex"
                w="full"
                justifyContent="space-between"
              >
                <StockItemCard />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </>
    </Accordion>
  );
}
