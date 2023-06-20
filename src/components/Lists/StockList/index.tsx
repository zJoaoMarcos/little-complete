import { StockItemCard } from "@/components/Cards/StockItemCard";
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

export function StockList() {
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <HStack spacing={20}>
                <Text>Tipo: SSD</Text>
                <Text>Qtd: 3</Text>
                <Text>Qtd. Min: 3</Text>
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
          <StockItemCard />
          <StockItemCard />
          <StockItemCard />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
