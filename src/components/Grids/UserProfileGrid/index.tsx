import { List, ListItem, SimpleGrid, Text } from "@chakra-ui/react";
import {
  BagSimple,
  Calendar,
  MicrosoftOutlookLogo,
  Phone,
  UserCircle,
  UserCircleGear,
  Wrench,
} from "@phosphor-icons/react";

interface UserProfileGridProps {
  user: {
    user_name: string;
    complete_name: string;
    title: string;
    department_id: string;
    telephone: number | null;
    direct_boss: string;
    smtp: string;
    admission_date: string;
    demission_date: string | null;
    status: string;
  };
}

export function UserProfileGrid({ user }: UserProfileGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} marginTop={8}>
      <List spacing={6}>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <UserCircle />
          <Text as={"span"} fontWeight={"bold"}>
            Usuário:
          </Text>

          <Text pl="2">{user.user_name}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Wrench />
          <Text as={"span"} fontWeight={"bold"}>
            Cargo:
          </Text>
          <Text>{user.title}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <BagSimple />
          <Text as={"span"} fontWeight={"bold"}>
            Departamento:
          </Text>
          <Text>{user.department_id}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <UserCircleGear />
          <Text as={"span"} fontWeight={"bold"}>
            Chefia Imediata:
          </Text>
          <Text>{user.direct_boss}</Text>
        </ListItem>
      </List>

      <List spacing={6}>
        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <MicrosoftOutlookLogo />
          <Text as={"span"} fontWeight={"bold"}>
            E-mail:
          </Text>
          <Text>{user.smtp}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Phone weight="fill" />
          <Text as={"span"} fontWeight={"bold"}>
            Ramal:
          </Text>
          <Text>{user.telephone}</Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Calendar />
          <Text as={"span"} fontWeight={"bold"}>
            Data de Admissão:
          </Text>
          <Text>
            {user.demission_date === null
              ? " - / / - "
              : String(user.demission_date)}
          </Text>
        </ListItem>

        <ListItem
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
        >
          <Calendar />
          <Text as={"span"} fontWeight={"bold"}>
            Data de Demissão:
          </Text>
          <Text>
            {user.demission_date === null
              ? " - / / - "
              : String(user.demission_date)}
          </Text>
        </ListItem>
      </List>
    </SimpleGrid>
  );
}
