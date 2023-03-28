/* eslint-disable react-hooks/rules-of-hooks */
import { useColorModeValue } from "@chakra-ui/react";
import { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  let isActive = false;

  const { pathname } = useRouter();

  if (
    shouldMatchExactHref &&
    (pathname === rest.href || pathname === rest.as)
  ) {
    isActive = true;
  }

  if (
    !shouldMatchExactHref &&
    (pathname.startsWith(String(rest.href)) ||
      pathname.startsWith(String(rest.as)))
  ) {
    isActive = true;
  }

  return (
    <>
      {cloneElement(children, {
        color: isActive ? "purple.600" : useColorModeValue("gray.800", ""),
        href: rest.href,
      })}
    </>
  );
}
