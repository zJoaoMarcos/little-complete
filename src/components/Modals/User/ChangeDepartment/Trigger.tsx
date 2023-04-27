import { Button, useDisclosure } from "@chakra-ui/react";
import { Pencil } from "@phosphor-icons/react";
import { ChangeDepartmentModal } from ".";

interface TriggerChangeDepartmentProps {
  userName: string;
  title: string;
  departmentId: string;
  directBoss: string;
}

export function TriggerChangeDepartment({
  userName,
  title,
  departmentId,
  directBoss,
}: TriggerChangeDepartmentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<Pencil />} colorScheme="purple">
        Cargo
      </Button>

      <ChangeDepartmentModal
        isOpen={isOpen}
        onClose={onClose}
        userName={userName}
        title={title}
        departmentId={departmentId}
        directBoss={directBoss}
      />
    </>
  );
}
