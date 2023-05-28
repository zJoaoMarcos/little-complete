import { Heading, Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Heading
      fontWeight={600}
      fontSize={{ base: "xl", sm: "2xl", md: "4xl" }}
      lineHeight={"110%"}
    >
      Little Complete{" "}
      <Text as={"span"} color={"purple.400"}>
        {"</>"}
      </Text>
    </Heading>
  );
}
