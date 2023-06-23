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
import { AvaliableEquipmentsInput } from "./AvaliableEquipmentsInput";
import { useAssignEquipment } from "./hooks/useAssignEquipment";
import { AssignEquipmentModalProps } from "./types";

export function AssignEquipmentModal({
  isOpen,
  onClose,
  username,
}: AssignEquipmentModalProps) {
  const { data, handleAssign, setValue } = useAssignEquipment(
    username,
    onClose
  );

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
