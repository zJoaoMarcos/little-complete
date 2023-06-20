import { UseDisclosureReturn } from "@chakra-ui/react";

export interface SideBarDrawerProviderProps {
  children: React.ReactNode;
}

export type SidebarDrawerContextData = UseDisclosureReturn;
