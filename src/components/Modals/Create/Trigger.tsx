import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Plus } from "@phosphor-icons/react";
import { CreateModal } from ".";

export function TriggerCreate() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Plus />}
        colorScheme={useColorModeValue("pink", "whiteAlpha")}
        textColor="white"
      >
        New
      </Button>

      <CreateModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
