import { useEquipment } from "@/contexts/EquipmetContext";
import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { AvaliableEquipmentsInput } from "./AvaliableEquipmentsInput";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  department_id: number;
}

export function AssignEquipmentModal({
  isOpen,
  onClose,
  username,
  department_id,
}: ModalProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("avaliable");

  const { data } = useFetchInvetoryList({ status });

  const { assignEquipment } = useEquipment();
  const handleAssign = async () => {
    await assignEquipment.mutateAsync({ username, equipment_id: value });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Atribuir Equipamento</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" id="update_item">
            <AvaliableEquipmentsInput
              equipments={data?.equipments!}
              setValue={setValue}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            form="assign_equip"
            colorScheme="purple"
            type="submit"
            onClick={() => handleAssign()}
          >
            Atribuir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
