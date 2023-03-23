import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { TriggerEdit } from "../Modals/Edit/Trigger";
import { TriggerMovement } from "../Modals/Movement/Trigger";

interface Item {
  id: string;
  name: string;
  description: string;
  type: string;
  amount: number;
  amount_min: number;
  local: string;
}

interface TableStockProps {
  items: Item[] | undefined;
}

export function TableStock({ items }: TableStockProps) {
  return (
    <TableContainer w="100%" marginTop="8" px="2" py="4" borderRadius="md">
      <Table
        variant="simple"
        size="sm"
        colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
      >
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Tipo</Th>
            <Th>Local</Th>
            <Th>Qtd</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {items?.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.type}</Td>
                <Td>{item.local}</Td>
                <Td>{item.amount}</Td>
                <Td>
                  <TriggerMovement id={item.id} />
                </Td>
                <Td>
                  <TriggerEdit item={item} />
                </Td>
              </Tr>
            ))}
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
