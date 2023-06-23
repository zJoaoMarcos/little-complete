import { Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { ArrowsClockwise } from "@phosphor-icons/react";

import { UpdateUserStatusModal } from ".";
import { TriggerAssignEquipmentProps } from "./types";

export function TriggerUpdateUserStatus({
  useName,
  isIconButton = false,
  currentStatus,
}: TriggerAssignEquipmentProps) {
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

      <UpdateUserStatusModal
        currentStatus={currentStatus}
        isOpen={isOpen}
        onClose={onClose}
        userName={useName}
      />
    </>
  );
}
