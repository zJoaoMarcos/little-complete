import { api } from "@/services/api";
import { createContext } from "vm";
import { AuthContextData, AuthProviderProps, SignInParams } from "./types";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  async function signIn({ email, password }: SignInParams) {
    try {
      const response = await api.post("auth", {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
}
