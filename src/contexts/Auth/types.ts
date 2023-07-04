import { ReactNode } from "react";

export type SignInParams = {
  email: string;
  password: string;
};

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  signIn: (credentials: SignInParams) => Promise<void>;
}
