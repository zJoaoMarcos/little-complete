import {
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Eye } from "@phosphor-icons/react";

interface Equipment {
  id: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: string | null;
  department: string;
  status: string;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
}

interface TableInventoryProps {
  equipments: Equipment[] | undefined;
}

export function TableInventory({ equipments }: TableInventoryProps) {
  return (
    <TableContainer w="100%" marginTop="8" px="2" py="4" borderRadius="md">
      <Table
        variant="simple"
        size="sm"
        colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
      >
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Status</Th>
            <Th>Marca</Th>
            <Th>Model</Th>
            <Th>Departamento</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <>
            {equipments?.map((equipment) => (
              <Tr key={equipment.id}>
                <Td>{equipment.id}</Td>
                <Td>{equipment.status}</Td>
                <Td>{equipment.brand}</Td>
                <Td>{equipment.model}</Td>
                <Td>{equipment.department}</Td>
                <Td>
                  <Link href={`/inventory/${equipment.id}`}>
                    <Eye size={20} />
                  </Link>
                </Td>
              </Tr>
            ))}
          </>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
