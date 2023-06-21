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
import { UseStockItems } from "./hooks/UseStockItems";
import { StockListProps } from "./types";

export function StockList({ stockList }: StockListProps) {
  const { data, isLoading, isFetching } = UseStockItems();

  return (
    <Accordion allowMultiple w="full">
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
              {data?.items
                .filter((item) => item.type === group.itemType)
                .map((item) => {
                  return <StockItemCard key={item.id} item={item} />;
                })}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
