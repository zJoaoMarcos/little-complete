import { Icon } from "@chakra-ui/react";
import { Cpu, Cube, Usb } from "@phosphor-icons/react";
import { CategoryIconProps } from "./types";

export function CategoryIcon({ category }: CategoryIconProps) {
  if (category === "hardware") {
    return (
      <Icon
        as={Cpu}
        bgColor="purple.100"
        borderRadius="full"
        w="8"
        h="8"
        p="1"
      />
    );
  }

  if (category === "peripherals") {
    return (
      <Icon
        as={Usb}
        bgColor="purple.100"
        borderRadius="full"
        w="8"
        h="8"
        p="1"
      />
    );
  }

  return (
    <Icon
      as={Cube}
      bgColor="purple.100"
      borderRadius="full"
      w="8"
      h="8"
      p="1"
    />
  );
}
