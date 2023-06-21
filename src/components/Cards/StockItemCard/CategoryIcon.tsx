import { Icon } from "@chakra-ui/react";
import { Cpu, Cube, Usb } from "@phosphor-icons/react";
import { CategoryIconProps } from "./types";

export function CategoryIcon({ category }: CategoryIconProps) {
  if (category === "hardware") {
    return <Icon as={Cpu} />;
  }

  if (category === "peripherals") {
    return <Icon as={Usb} />;
  }

  return <Icon as={Cube} />;
}
