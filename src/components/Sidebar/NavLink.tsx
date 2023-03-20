import {
  Icon,
  Link,
  LinkProps as ChakraLinkProps,
  Text,
} from "@chakra-ui/react";
import { ElementType, ReactNode } from "react";

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: ReactNode;
}

export function NavLink({ icon, children, ...rest }: NavLinkProps) {
  return (
    <Link display="flex" alignItems="center" {...rest}>
      <Icon as={icon} />
      <Text ml="4" fontWeight="medium">
        {children}
      </Text>
    </Link>
  );
}
