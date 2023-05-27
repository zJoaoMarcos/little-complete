import { ReactNode } from "react";
import { DepartmentProvider } from "./DepartmentContext";
import { EquipmentProvider } from "./EquipmetContext";
import { SidebarDrawerProvider } from "./SidebarDrawerContext";
import { StockProvider } from "./StockContext";
import { UserProvider } from "./UserContext";

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
