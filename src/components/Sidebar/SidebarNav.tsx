import { Stack } from "@chakra-ui/react";
import { Notebook, Printer, Storefront } from "@phosphor-icons/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="CONTROLES">
        <NavLink icon={Notebook}>Equipamentos</NavLink>
        <NavLink icon={Printer}>Impressoras</NavLink>
      </NavSection>
      <NavSection title="COMPRAS">
        <NavLink icon={Storefront}>Lista de Compras</NavLink>
      </NavSection>
    </Stack>
  );
}
