import { useFetchInvetoryList } from "@/hooks/UseFetchInventoryList";
import { useFetchUsersList } from "@/hooks/UseFetchUsersList";
import { Stack, Text } from "@chakra-ui/react";
import {
  Buildings,
  Notebook,
  Package,
  Storefront,
  User,
  X,
} from "@phosphor-icons/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { data: users } = useFetchUsersList({
    key: "users-pendencies",
    status: "pendency",
  });
  const { data: equips } = useFetchInvetoryList({
    key: "equipments-pendencies",
    status: "pendency",
  });

  const totalPendency = (users?.totalCount ?? 0) + (equips?.totalCount ?? 0);

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
          {totalPendency >= 0 && (
            <Text
              ml="1"
              as="span"
              bg="pink.500"
              color="white"
              fontSize="xs"
              px="2"
              py="1"
              rounded="full"
            >
              {totalPendency}
            </Text>
          )}
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
