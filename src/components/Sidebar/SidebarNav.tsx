import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Stack } from "@chakra-ui/react";
import {
  Buildings,
  Notebook,
  Package,
  Storefront,
  User,
  X,
} from "@phosphor-icons/react";
import { IconPendencies } from "../IconsPendencies";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { data } = useFetchUsersList({ key: "pendency", status: "pendency" });

  return (
    <Stack spacing="8" align="flex-start">
      <NavSection title="ORGANIZAÇÃO">
        <NavLink icon={User} href="/users">
          Usuários
        </NavLink>

        <NavLink icon={Buildings} href="/departments">
          Departamentos
        </NavLink>
      </NavSection>

      <NavSection title="CONTROLES">
        <NavLink icon={X} href="/pendency">
          Pendências
          {data?.totalCount && <IconPendencies pendencies={data.totalCount} />}
        </NavLink>

        <NavLink icon={Notebook} href="/inventory">
          Equipamentos
        </NavLink>

        <NavLink icon={Package} href="/stock">
          Estoque
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
