import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { UpdateUserStatusModal } from ".";

interface TriggerAssignEquipment {
  useName: string;
  currentStatus: string;
}

export function TriggerUpdateUserStatus({
  useName,
  currentStatus,
}: TriggerAssignEquipment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<ArrowsClockwise />}
        colorScheme="purple"
      >
        Status
      </Button>

      <UpdateUserStatusModal
        currentStatus={currentStatus}
        isOpen={isOpen}
        onClose={onClose}
        userName={useName}
      />
    </>
  );
}
