import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { UpdateEquipmentStatusModal } from ".";

interface TriggerUpdateStatusEquipment {
  equipment_id: string;
  currentStatus: string;
  isIconButton?: boolean;
}

export function TriggerUpdateEquipmentStatus({
  equipment_id,
  isIconButton = false,
  currentStatus,
}: TriggerUpdateStatusEquipment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isIconButton ? (
        <IconButton
          aria-label="update_status"
          onClick={onOpen}
          icon={<ArrowsClockwise color="purple" />}
        />
      ) : (
        <Button
          onClick={onOpen}
          leftIcon={<ArrowsClockwise />}
          colorScheme="purple"
        >
          Status
        </Button>
      )}

      <UpdateEquipmentStatusModal
        currentStatus={currentStatus}
        isOpen={isOpen}
        onClose={onClose}
        equipment_id={equipment_id}
      />
    </>
  );
}
