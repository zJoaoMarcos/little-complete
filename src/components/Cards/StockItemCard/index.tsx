import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { DotsThreeVertical } from "@phosphor-icons/react";

import { CategoryIcon } from "./CategoryIcon";
import { StockItemCardProps } from "./types";

export function StockItemCard({ item }: StockItemCardProps) {
  return (
    <Card minW="4xs">
      <CardHeader>
        <HStack justifyContent="space-between" mb="1">
          <CategoryIcon category={item.category} />

          <IconButton
            aria-label="about-item"
            icon={<DotsThreeVertical size={20} />}
            borderRadius="full"
            bgColor="transparent"
          />
        </HStack>

        <HStack fontWeight="semibold">
          <Text>{item.type}:</Text>
          <Text color="purple.600">{item.brand}</Text>
        </HStack>
      </CardHeader>

      <CardBody>
        <HStack>
          <Text fontWeight="semibold">Modelo:</Text>
          <Text>{item.model}</Text>
        </HStack>

        <HStack>
          <Text fontWeight="semibold">Qtd:</Text>
          <Text>{item.amount}</Text>
        </HStack>
      </CardBody>

      <CardFooter w="full" display="flex" justifyContent="center">
        <Button colorScheme="purple">Movimentar</Button>
      </CardFooter>
    </Card>
  );
}
