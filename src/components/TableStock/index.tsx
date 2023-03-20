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
import { TriggerDelete } from "../Modals/Delete/Trigger";
import { TriggerEdit } from "../Modals/Edit/Trigger";
import { TriggerMovement } from "../Modals/Movement/Trigger";

export function TableStock() {
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
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>SSD</Td>
            <Td>Hardware</Td>
            <Td>8°Andar</Td>
            <Td>40</Td>
            <Td>
              <TriggerMovement />
            </Td>
            <Td>
              <TriggerEdit />
            </Td>
            <Td>
              <TriggerDelete />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
