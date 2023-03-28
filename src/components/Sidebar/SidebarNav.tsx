import { Stack } from "@chakra-ui/react";
import { Notebook, Package, Printer, Storefront } from "@phosphor-icons/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="CONTROLES">
        <NavLink icon={Package} href="/stock">
          Estoque
        </NavLink>

        <NavLink icon={Notebook} href="/inventory">
          Equipamentos
        </NavLink>
        <NavLink icon={Printer} href="/printers">
          Impressoras
        </NavLink>
      </NavSection>

      <NavSection title="COMPRAS">
        <NavLink icon={Storefront} href="/shop">
          Lista de Compras
        </NavLink>
      </NavSection>
    </Stack>
  );
}
