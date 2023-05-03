import { List, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import {
  BagSimple,
  Calendar,
  Cpu,
  Factory,
  HardDrive,
} from "@phosphor-icons/react";

interface EquipmentProfileGridProps {
  equipment: {
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
  };
}

export function EquipmentProfileGrid({ equipment }: EquipmentProfileGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={8}>
      <List spacing={6}>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            ID:
          </Text>
          <Text>{equipment.id}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Factory />
          <Text as={"span"} fontWeight={"bold"}>
            Fabricante:
          </Text>
          <Text>{equipment.brand}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Modelo:
          </Text>
          <Text>{equipment.model}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Cpu />
          <Text as={"span"} fontWeight={"bold"}>
            Processador:
          </Text>
          <Text>{equipment.cpu}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Memória Ram:
          </Text>
          <Text>{equipment.ram}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Slots:
          </Text>
          <Text>{equipment.slots}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <HardDrive />
          <Text as={"span"} fontWeight={"bold"}>
            Tipo de Armazenamento (1):
          </Text>
          <Text>{equipment.storage0_type}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <HardDrive />
          <Text as={"span"} fontWeight={"bold"}>
            Tamanho do Armazenamento (1):
          </Text>
          <Text>{equipment.storage0_syze}</Text>
        </ListItem>
      </List>

      <List spacing={6}>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <BagSimple />
          <Text as={"span"} fontWeight={"bold"}>
            Departamento:
          </Text>
          <Text>{equipment.department}</Text>
        </ListItem>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Calendar />
          <Text as={"span"} fontWeight={"bold"}>
            Data de Compra:
          </Text>
          <Text>{equipment.purchase_date}</Text>
        </ListItem>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Garantia:
          </Text>
          <Text>{equipment.warranty}</Text>
        </ListItem>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Placa de Video:
          </Text>
          <Text>{equipment.video}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            Service Tag:
          </Text>
          <Text>{equipment.service_tag}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Text as={"span"} fontWeight={"bold"}>
            N° da NF:
          </Text>
          <Text>{equipment.invoice}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <HardDrive />
          <Text as={"span"} fontWeight={"bold"}>
            Tipo de Armazenamento (2):
          </Text>
          <Text>{equipment.storage1_type}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <HardDrive />
          <Text as={"span"} fontWeight={"bold"}>
            Tamanho do Armazenamento (2):
          </Text>
          <Text>{equipment.storage1_syze}</Text>
        </ListItem>
      </List>
    </SimpleGrid>
  );
}
