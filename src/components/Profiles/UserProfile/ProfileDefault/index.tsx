import { Header } from "../Header";
import { UserTabs } from "./UserTabs";
import { ProfileDefaultProps } from "./types";

export function ProfileDefault({ user, equipments }: ProfileDefaultProps) {
  return (
    <>
      <Header user={user} />

      <UserTabs user={user} equipments={equipments} />
    </>
  );
}
