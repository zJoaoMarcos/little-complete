import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Text,
} from "@chakra-ui/react";

import { TriggerEditStockItem } from "@/components/Modals/EditStockItemModal/Trigger";
import { TriggerTransactionStockItem } from "@/components/Modals/TransactionItemModal/Trigger";
import { CategoryIcon } from "./CategoryIcon";
import { StockItemCardProps } from "./types";

export function StockItemCard({ item }: StockItemCardProps) {
  return (
    <Card minW="4xs">
      <CardHeader>
        <HStack justifyContent="space-between" mb="1">
          <CategoryIcon category={item.category} />

          <TriggerEditStockItem item={item} />
        </HStack>

        <HStack fontWeight="semibold" fontSize="sm">
          <Text>{item.type}:</Text>
          <Text color="purple.600">{item.brand}</Text>
        </HStack>
      </CardHeader>

      <CardBody>
        <HStack fontSize="sm">
          <Text fontWeight="semibold">Modelo:</Text>
          <Text>{item.model}</Text>
        </HStack>

        <HStack fontSize="sm">
          <Text fontWeight="semibold">Qtd:</Text>
          <Text>{item.amount}</Text>
        </HStack>
      </CardBody>

      <CardFooter display="flex" justifyContent="center">
        <TriggerTransactionStockItem item={item} />
      </CardFooter>
    </Card>
  );
}
