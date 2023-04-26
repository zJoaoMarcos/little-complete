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
import { TriggerMovement } from "../Modals/Movement/Trigger";

interface User {
  user_name: string;
  complete_name: string;
  title: string;
  department_id: string;
  telephone: number | null;
  direct_boss: string;
  smtp: string;
  admission_date: string;
  demission_date: string | null;
  status: string;
}

interface TableStockProps {
  users: User[] | undefined;
}

export function TableUser({ users }: TableStockProps) {
  return (
    <TableContainer w="100%" marginTop="8" px="2" py="4" borderRadius="md">
      <Table
        variant="simple"
        size="sm"
        colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
      >
        <Thead>
          <Tr>
            <Th>User Name</Th>
            <Th>Nome</Th>
            <Th>Departamento</Th>
            <Th>Cargo</Th>
            <Th>Status</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {users?.map((user) => (
              <Tr key={user.user_name}>
                <Td>{user.user_name}</Td>
                <Td>{user.complete_name}</Td>
                <Td>{user.department_id}</Td>
                <Td>{user.title}</Td>
                <Td>{user.status}</Td>
                <Td>
                  <TriggerMovement id={user.user_name} />
                </Td>
                {/* <Td>
                  <TriggerEdit item={user} />
                </Td> */}
              </Tr>
            ))}
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
