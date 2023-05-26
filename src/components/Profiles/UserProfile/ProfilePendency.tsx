import { UserAvatar } from "@/components/Avatars/UserAvatar";
import { UserBagdeStatus } from "@/components/Avatars/UserAvatar/UserBadgeStatus";
import { UnassignEquipmentsForm } from "@/components/Forms/UnassignEquipments";
import { TriggerUpdateUserStatus } from "@/components/Modals/UpdateUserStatus/Trigger";
import { UserPendencyStepper } from "@/components/Steppers/UserPendencyStepper";
import { useUser } from "@/contexts/UserContext";
import { concatFirstNameAndLastName } from "@/utils/concatFirstNameAndLastName";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  useSteps,
} from "@chakra-ui/react";
import { XCircle } from "@phosphor-icons/react";

interface Equipment {
  id: string;
  type: string;
  brand: string;
  model: string;
  supplier: string | null;
  invoice: string | null;
  warranty: string | null;
  purchase_date: Date | null;
  department: { id: number | null; name: string | null };
  status: string | null;
  cpu: string | null;
  ram: string | null;
  slots: number | null;
  storage0_type: string | null;
  storage0_syze: number | null;
  storage1_type: string | null;
  storage1_syze: number | null;
  video: string | null;
  service_tag: string | null;
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
  const avatarName = concatFirstNameAndLastName(user.complete_name);

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Box
      flex="1"
      h="full"
      p="8"
      bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
      overflowX="auto"
      borderRadius="md"
    >
      <Flex mb="10" justify="space-between" align="center">
        <HStack spacing={8}>
          <UserAvatar name={avatarName} size="lg" />
          <VStack justify={"start"} alignItems="start">
            <Heading as="h3" fontWeight="semibold" fontSize={18}>
              {user.complete_name}
            </Heading>

            <HStack>
              <Text fontWeight="semibold" fontSize={16}>
                Status:
              </Text>
              <UserBagdeStatus status={user.status} />
            </HStack>
          </VStack>
        </HStack>
        <TriggerUpdateUserStatus
          currentStatus={user.status}
          useName={user.user_name}
        />
      </Flex>

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
    </Box>
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
