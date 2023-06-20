import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Cpu, DotsThreeVertical } from "@phosphor-icons/react";

export function StockItemCard() {
  return (
    <Card maxW="xl">
      <CardHeader>
        <HStack justifyContent="space-between" mb="1">
          <Icon
            as={Cpu}
            p="1"
            w={8}
            h={8}
            bgColor="purple.400"
            rounded="full"
          />

          <IconButton
            aria-label="about-item"
            icon={<DotsThreeVertical size={20} />}
            borderRadius="full"
            bgColor="transparent"
          />
        </HStack>

        <HStack fontWeight="semibold">
          <Text>SSD:</Text>
          <Text color="purple.600">Kingston</Text>
        </HStack>
      </CardHeader>

      <CardBody>
        <HStack>
          <Text fontWeight="semibold">Modelo:</Text>
          <Text>240GB</Text>
        </HStack>

        <HStack>
          <Text fontWeight="semibold">Qtd:</Text>
          <Text>8</Text>
        </HStack>
      </CardBody>

      <CardFooter>
        <Button colorScheme="purple">Movimentar</Button>
      </CardFooter>
    </Card>
  );
}
