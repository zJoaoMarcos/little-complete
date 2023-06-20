import { ReactNode } from "react";
import { DepartmentProvider } from "./Department";
import { EquipmentProvider } from "./Inventory";
import { SidebarDrawerProvider } from "./SidebarDrawerContext";
import { UserProvider } from "./Users";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SidebarDrawerProvider>
      <DepartmentProvider>
        <UserProvider>
          <EquipmentProvider>{children}</EquipmentProvider>
        </UserProvider>
      </DepartmentProvider>
    </SidebarDrawerProvider>
  );
}
