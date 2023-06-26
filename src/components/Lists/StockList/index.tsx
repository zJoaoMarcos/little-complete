import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
    <Accordion allowMultiple>
      {stockList.map((group) => {
        return (
          <AccordionItem key={group.id}>
            <HStack as="span" flexDir="row" justifyContent="space-between">
              <HStack w="full" flexDir="row" justifyContent="space-between">
                <Text p="3" mr="auto">
                  Tipo: {group.itemType}
                </Text>

                <Text p="3" textAlign="center">
                  Quantidade: {group.amount}
                </Text>

                <Text p="3">Qtd. Minima: {group.amountMin}</Text>
              </HStack>

              <AccordionButton
                w="10"
                alignItems="center"
                justifyContent="center"
                rounded="md"
                color="black"
                display="flex"
                _hover={{ bgColor: "transparent" }}
              >
                <AccordionIcon />
              </AccordionButton>
            </HStack>

            <AccordionPanel w="full">
              <SimpleGrid
                w="full"
                columns={{ base: 2, sm: 2, md: 4 }}
                spacing="4"
              >
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
