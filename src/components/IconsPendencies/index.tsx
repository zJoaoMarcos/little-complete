import { Text } from "@chakra-ui/react";

interface Props {
  pendencies: number;
}

export function IconPendencies({ pendencies }: Props) {
  return (
    <Text
      as="span"
      bg="red.500"
      color="white"
      px="2"
      py="1"
      textDecoration="none"
      rounded="full"
      fontSize="2xs"
      position="absolute"
      left="134px"
      top="310px"
    >
      {pendencies}
    </Text>
  );
}
