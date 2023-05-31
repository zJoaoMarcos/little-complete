import { HStack, Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <HStack fontSize="2xl" fontWeight="normal" w="56">
      <Text>Little</Text>
      <Text fontWeight="semibold">Complete</Text>
      <Text as="span" color={"purple.500"} fontWeight="semibold">
        {"</>"}
      </Text>
    </HStack>
  );
}
