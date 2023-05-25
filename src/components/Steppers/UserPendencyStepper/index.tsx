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
} from "@chakra-ui/react";
import { CheckFat } from "@phosphor-icons/react";

interface UserPendencyStepperProps {
  steps: Array<{ title: string; description: string }>;
  activeStep: number;
}

export function UserPendencyStepper({
  steps,
  activeStep,
}: UserPendencyStepperProps) {
  return (
    <Stepper index={activeStep} colorScheme="purple">
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
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}
