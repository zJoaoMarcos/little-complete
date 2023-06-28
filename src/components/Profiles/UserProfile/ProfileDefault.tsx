import { Header } from "./Header";
import { ProfileTabs } from "./ProfileTabs";
import { ProfileDefaultProps } from "./types";

export function ProfileDefault({ user, equipments }: ProfileDefaultProps) {
  return (
    <>
      <Header user={user} />

      <ProfileTabs user={user} equipments={equipments} />
    </>
  );
}
