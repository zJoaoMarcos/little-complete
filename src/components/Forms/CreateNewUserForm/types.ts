import { Dispatch } from "react";

export interface NewUserFormProps {
  isSending: boolean;
  setIsSending: Dispatch<React.SetStateAction<boolean>>;
}
