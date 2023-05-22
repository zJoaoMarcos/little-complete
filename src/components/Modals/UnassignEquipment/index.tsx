import { useEquipment } from "@/contexts/EquipmetContext";
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

interface UnassignEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId: string;
}

export function UnassignEquipmentModal({
  isOpen,
  onClose,
  equipmentId,
}: UnassignEquipmentModalProps) {
  const { unassignEquipment } = useEquipment();
  const handleUnassign = async () => {
    await unassignEquipment.mutateAsync({ equipment_id: equipmentId });

    onClose();
  };

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
