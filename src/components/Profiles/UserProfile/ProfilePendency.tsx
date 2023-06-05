import { UnassignEquipmentsForm } from "@/components/Forms/UnassignEquipments";
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

interface Equipment {
  id: string;
  status: string;
  currentUser: string | null;
  patrimony: string | null;
  type: string | null;
  brand: string | null;
  model: string | null;
  serviceTag: string | null;
  purchase: {
    invoice: string | null;
    supplier: string | null;
    purchaseDate: Date | null;
    warranty: string | null;
  };
  department: {
    id: number | null;
    name: string | null;
  };
  config: {
    cpu: string | null;
    ram: string | null;
    video: string | null;
    storage: {
      slots: number | null;
      storage0Type: string | null;
      storage0Syze: number | null;
      storage1Type: string | null;
      storage1Syze: number | null;
    };
  };
}

interface ProfilePendencyProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department: { id: number; name: string };
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: Date | null;
    demission_date: Date | null;
    status: string;
  };

  equipments: Equipment[];
}

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
