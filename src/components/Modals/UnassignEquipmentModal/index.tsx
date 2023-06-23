import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useUnassignEquipment } from "./hooks/useUnassignEquipment";
import { UnassignEquipmentModalProps } from "./types";

export function UnassignEquipmentModal({
  isOpen,
  onClose,
  equipmentId,
}: UnassignEquipmentModalProps) {
  const { handleUnassign } = useUnassignEquipment(equipmentId, onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="span" color="purple.500">
            {equipmentId}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Deseja realmente desatribuir o equipamento ?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => handleUnassign()}
            form="unassign_equip"
            colorScheme="purple"
            type="submit"
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
