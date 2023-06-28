import {
  Box,
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { CheckFat } from "@phosphor-icons/react";

import { ShutDownUserForm } from "@/components/Forms/ShutDownUserForm/indext";
import { UnassignEquipmentsForm } from "@/components/Forms/UnassignAllEquipmentsForm";
import { PendencyStepsProps } from "./types";

export function PendencySteps({ equipments, user }: PendencyStepsProps) {
  const steps = [
    {
      title: "Equipamentos",
      description: "& Periféricos",
      form: (
        <UnassignEquipmentsForm
          equipments={equipments}
          username={user.user_name}
        />
      ),
    },
    {
      title: "Finalizar",
      description: "",
      form: <ShutDownUserForm username={user.user_name} />,
    },
  ];

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  });
  return (
    <Stepper
      index={activeStep}
      colorScheme="purple"
      orientation="vertical"
      p="4"
    >
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<CheckFat color="white" weight="fill" />}
              incomplete={<StepNumber />}
              active={`📍`}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>

            <StepDescription>{step.description}</StepDescription>

            {step.form}
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
