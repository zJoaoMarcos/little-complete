import { Button, Flex } from "@chakra-ui/react";
import { useDisableUser } from "./hooks/useDisableUser";

interface ShutDownFormProps {
  username: string;
}

export function ShutDownUserForm({ username }: ShutDownFormProps) {
  const { handleDisabled } = useDisableUser(username);

  return (
    <Flex
      w="full"
      flexDir="column"
      align="center"
      justifyContent="space-between"
      p="4"
    >
      <Button onClick={handleDisabled} colorScheme="red">
        Finalizar Desligamento
      </Button>
    </Flex>
  );
}
