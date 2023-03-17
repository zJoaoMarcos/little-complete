import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TriggerDelete } from "../Modals/Delete/Trigger";
import { TriggerEdit } from "../Modals/Edit/Trigger";
import { TriggerMovement } from "../Modals/Movement/Trigger";

export function TableStock() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <TableContainer
      marginTop="8"
      border="1px"
      px="2"
      py="4"
      borderRadius="md"
      borderColor={useColorModeValue("gray.200", "gray.600")}
    >
      <Table variant="striped" size="sm" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Type</Th>
            <Th>Place</Th>
            <Th>Name</Th>
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
