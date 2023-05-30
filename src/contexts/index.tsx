import { ReactNode } from "react";
import { DepartmentProvider } from "./DepartmentContext";
import { EquipmentProvider } from "./Inventory";
import { SidebarDrawerProvider } from "./SidebarDrawerContext";
import { StockProvider } from "./StockContext";
import { UserProvider } from "./Users";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <SidebarDrawerProvider>
      <DepartmentProvider>
        <UserProvider>
          <EquipmentProvider>
            <StockProvider>{children}</StockProvider>
          </EquipmentProvider>
        </UserProvider>
      </DepartmentProvider>
    </SidebarDrawerProvider>
  );
}
