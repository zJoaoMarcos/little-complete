import { Divider, Flex } from "@chakra-ui/react";

import { Header } from "./Header";
import { PendencySteps } from "./PendencySteps";
import { ProfilePendencyProps } from "./types";

export function ProfilePendency({ user, equipments }: ProfilePendencyProps) {
  return (
    <>
      <Header user={user} />

      <Divider mb="10" />

      <Flex
        w="full"
        flexDir="column"
        align="center"
        justifyContent="space-between"
      >
        <PendencySteps equipments={equipments} user={user} />
      </Flex>
    </>
  );
}
