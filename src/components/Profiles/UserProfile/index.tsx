import { ProfileDefault } from "./ProfileDefault";
import { ProfilePendency } from "./ProfilePendency";
import { UserProfileProps } from "./types";

export function UserProfile({ equipments, user }: UserProfileProps) {
  if (user.status === "pendency") {
    return <ProfilePendency user={user} equipments={equipments} />;
  }

  return <ProfileDefault user={user} equipments={equipments} />;
}
