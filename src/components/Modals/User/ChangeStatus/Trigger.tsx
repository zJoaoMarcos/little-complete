import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { ChangeStatusModal } from ".";

interface TriggerChangeStatusProps {
  userName: string;
  currentStatus: string;
}

export function TriggerChangeStatus({
  userName,
  currentStatus,
}: TriggerChangeStatusProps) {
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

      <ChangeStatusModal
        isOpen={isOpen}
        onClose={onClose}
        userName={userName}
        currentStatus={currentStatus}
      />
    </>
  );
}
