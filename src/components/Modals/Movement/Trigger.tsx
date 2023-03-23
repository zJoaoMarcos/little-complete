import { IconButton, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { MovementModal } from ".";

interface TriggerMovementProps {
  id: string;
}

export function TriggerMovement({ id }: TriggerMovementProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="movment"
        onClick={onOpen}
        icon={<ArrowsClockwise />}
        borderRadius="full"
        bg="transparent"
      />

      <MovementModal isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
}
