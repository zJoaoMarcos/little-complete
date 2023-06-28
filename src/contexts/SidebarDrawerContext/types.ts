import { UseDisclosureReturn } from "@chakra-ui/react";

export interface SideBarDrawerProviderProps {
  children: React.ReactNode;
}

export interface SidebarDrawerContextData {
  disclousure: UseDisclosureReturn;
  totalPendencies: number;
}
