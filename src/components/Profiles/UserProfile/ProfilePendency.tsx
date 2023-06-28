import { ShutDownUserForm } from "@/components/Forms/ShutDownUserForm/indext";
import { UnassignEquipmentsForm } from "@/components/Forms/UnassignAllEquipmentsForm";
import { UserPendencyStepper } from "@/components/Steppers/UserPendencyStepper";
import { Divider, useSteps } from "@chakra-ui/react";
import { Header } from "./Header";
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
      <Header user={user} />
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
        <ShutDownUserForm
          username={user.user_name}
          goToPrevious={goToPrevious}
        />
      )}
      e
    </>
  );
}
