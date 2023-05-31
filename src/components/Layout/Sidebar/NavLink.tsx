import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Icon,
  Text,
} from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";
import { ActiveLink } from "./ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: ReactNode;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href}>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
