import { Button, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { ChangeStatusModal } from ".";

export function TriggerChangeStatus() {
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

      <ChangeStatusModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
