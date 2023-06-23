import { Box, useRadio } from "@chakra-ui/react";

import { EquipmentRadioCardProps } from "./types";

export function EquipmentRadioCard({
  children,
  ...rest
}: EquipmentRadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio({ ...rest });

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Box
        w="full"
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _hover={{
          bg: "purple.100",
        }}
        _checked={{
          bg: "purple.200",
          color: "black",
          borderColor: "purple.300",
        }}
        _focus={{
          borderColor: "purple.800",
        }}
        px={5}
        py={3}
      >
        {children}
      </Box>
    </Box>
  );
}
