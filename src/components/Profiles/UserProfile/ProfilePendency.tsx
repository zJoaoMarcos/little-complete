import { UnassignEquipmentsForm } from "@/components/Forms/UnassignAllEquipmentsForm";
import { UserPendencyStepper } from "@/components/Steppers/UserPendencyStepper";
import { useUser } from "@/contexts/Users";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { XCircle } from "@phosphor-icons/react";
import { UserHeader } from "./UserHeader";
import { ProfilePendencyProps } from "./types";

const steps = [
  { title: "Equipamentos", description: "& Periféricos" },
  { title: "Finalizar", description: "" },
];

export function ProfilePendency({ user, equipments }: ProfilePendencyProps) {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <UserHeader user={user} />

      <Divider mb="10" />

      <UserPendencyStepper activeStep={activeStep} steps={steps} />

      {activeStep === 0 && (
        <UnassignEquipmentsForm
          username={user.user_name}
          equipments={equipments}
          goToNext={goToNext}
        />
      )}

      {activeStep === 1 && (
        <ShutDownForm username={user.user_name} goToPrevious={goToPrevious} />
      )}
    </>
  );
}

interface ShutDownFormProps {
  goToPrevious: () => void;
  username: string;
}

function ShutDownForm({ goToPrevious, username }: ShutDownFormProps) {
  const { updateStatus } = useUser();
  const handleDisabled = async () => {
    await updateStatus.mutateAsync({ user_name: username, status: "disabled" });
  };
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
