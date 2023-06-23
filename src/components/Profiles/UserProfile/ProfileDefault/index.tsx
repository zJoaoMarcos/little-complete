import { UserHeader } from "../UserHeader";
import { UserTabs } from "./UserTabs";
import { ProfileDefaultProps } from "./types";

export function ProfileDefault({ user, equipments }: ProfileDefaultProps) {
  return (
    <>
      <UserHeader user={user} />

      <UserTabs user={user} equipments={equipments} />
    </>
  );
}
