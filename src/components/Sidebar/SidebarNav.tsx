import { Stack } from "@chakra-ui/react";
import {
  Buildings,
  Notebook,
  Package,
  Printer,
  Storefront,
  User,
} from "@phosphor-icons/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="DEPARTAMENTOS">
        <NavLink icon={Buildings} href="/departments">
          Departamentos
        </NavLink>
      </NavSection>

      <NavSection title="USUÁRIOS">
        <NavLink icon={User} href="/users">
          Usuários
        </NavLink>
      </NavSection>

      <NavSection title="CONTROLES">
        <NavLink icon={Notebook} href="/inventory">
          Equipamentos
        </NavLink>
        <NavLink icon={Printer} href="/printers">
          Impressoras
        </NavLink>
      </NavSection>

      <NavSection title="COMPRAS">
        <NavLink icon={Package} href="/stock">
          Estoque
        </NavLink>

        <NavLink icon={Storefront} href="/shop">
          Lista de Compras
        </NavLink>
      </NavSection>
    </Stack>
  );
}
