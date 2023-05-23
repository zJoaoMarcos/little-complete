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
  const status = "pendency";
  const { data } = useFetchUsersList({ status });

  console.log(data);

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
          <>
            Pendências
            {data?.totalCount && (
              <Text
                as="span"
                fontSize="12px"
                fontWeight="semibold"
                bg="red.400"
                color="white"
                p="2"
                rounded="full"
                mb={20}
                ml="2"
              >
                {data?.totalCount}
              </Text>
            )}
          </>
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
