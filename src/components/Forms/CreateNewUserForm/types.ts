import { z } from "zod";

import { Dispatch } from "react";
import { createUserSchema } from "./schema";

export type CreateUserData = z.infer<typeof createUserSchema>;

export interface NewUserFormProps {
  isSending: boolean;
  setIsSending: Dispatch<React.SetStateAction<boolean>>;
}
