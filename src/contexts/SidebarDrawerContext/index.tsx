/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

import { useInvetoryList } from "@/hooks/useInventoryList";
import { useUsersList } from "@/hooks/useUsersLists";
import { SideBarDrawerProviderProps, SidebarDrawerContextData } from "./types";

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SideBarDrawerProviderProps) {
  const disclousure = useDisclosure();
  const router = useRouter();

  const { data: users } = useUsersList({
    status: "pendency",
  });
  const { data: equipments } = useInvetoryList({
    status: "pendency",
  });

  const totalPendencies =
    (equipments?.totalCount ?? 0) + (users?.totalCount ?? 0);

  useEffect(() => {
    disclousure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={{ disclousure, totalPendencies }}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
