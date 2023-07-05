import { ReactNode } from "react";

export interface User {
  email: string;
  username: string;
  displayName: string;
}

export type SignInParams = {
  email: string;
  password: string;
};

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextData {
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInParams) => Promise<void>;
  signOut: () => void;
}
