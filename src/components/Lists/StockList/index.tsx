import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { StockItemCard } from "./StockItemCard";
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

            <AccordionPanel>
              <SimpleGrid columns={{ base: 4, md: 5 }} spacing="4">
                {data?.items
                  .filter((item) => item.type === group.itemType)
                  .map((item) => {
                    return <StockItemCard key={item.id} item={item} />;
                  })}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
