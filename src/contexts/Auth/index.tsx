import { api } from "@/services/api";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextData,
  AuthProviderProps,
  SignInParams,
  User,
} from "./types";

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "littlecomplete.token");
  destroyCookie(undefined, "littlecomplete.refreshToken");

  /*  authChanel.postMessage("signOut"); */

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user?.email;

  useEffect(() => {
    const { "littlecomplete.token": token } = parseCookies();

    if (token) {
      api
        .get("auth/me")
        .then((response) => {
          const { email } = response.data;
          setUser({ email });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: SignInParams) {
    try {
      const response = await api.post("auth/signin", {
        email,
        password,
      });
      console.log(response.data);
      const { accessToken, refreshToken } = response.data;

      setCookie(undefined, "littlecomplete.token", accessToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "littlecomplete.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      setUser({ email });

      Router.push("/users");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
