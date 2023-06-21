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
import { ArrowsClockwise, DotsThreeVertical } from "@phosphor-icons/react";

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
        <Button
          w="full"
          size="sm"
          border="1px"
          borderColor="purple.400"
          leftIcon={<ArrowsClockwise />}
        >
          Movimentar
        </Button>
      </CardFooter>
    </Card>
  );
}
