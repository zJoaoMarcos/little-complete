/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

import { SideBarDrawerProviderProps, SidebarDrawerContextData } from "./types";

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SideBarDrawerProviderProps) {
  const disclousure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclousure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclousure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
