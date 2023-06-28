import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { XCircle } from "@phosphor-icons/react";
import { useDisableUser } from "./hooks/useDisableUser";

interface ShutDownFormProps {
  goToPrevious: () => void;
  username: string;
}

export function ShutDownUserForm({
  goToPrevious,
  username,
}: ShutDownFormProps) {
  const { handleDisabled } = useDisableUser(username);

  return (
    <Flex
      h="150"
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      mt="20"
    >
      <XCircle weight="duotone" size={50} color="red" />
      <Text fontWeight="semibold">Finalizar Desligamento </Text>

      <HStack ml="auto">
        <Button
          onClick={() => goToPrevious()}
          type="button"
          colorScheme="purple"
        >
          Passo Anterior
        </Button>
        <Button onClick={handleDisabled} colorScheme="red">
          Finalizar
        </Button>
      </HStack>
    </Flex>
  );
}
