import { useSidebarDrawer } from "@/contexts/SidebarDrawerContext";
import { Stack, Text } from "@chakra-ui/react";
import {
  Buildings,
  Notebook,
  Package,
  User,
  WarningCircle,
} from "@phosphor-icons/react";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  const { totalPendencies } = useSidebarDrawer();

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
        <NavLink icon={WarningCircle} href="/pendency">
          Pendências
          {totalPendencies > 0 && <PendenciesIcon quantity={totalPendencies} />}
        </NavLink>

        <NavLink icon={Notebook} href="/inventory">
          Inventário
        </NavLink>

        <NavLink icon={Package} href="/stock">
          Estoque
        </NavLink>
      </NavSection>
    </Stack>
  );
}

function PendenciesIcon({ quantity }: { quantity: number }) {
  return (
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
      {quantity}
    </Text>
  );
}
