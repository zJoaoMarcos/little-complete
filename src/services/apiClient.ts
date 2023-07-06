import { AuthTokenError } from "@/errors/AuthTokenError";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { signOut } from "next-auth/react";
import { parseCookies, setCookie } from "nookies";

interface AxiosErrorResponse {
  message?: string;
}

let isRefreshing = false;
let failedRequestsQueue: any = [];

export function setupApiClient(
  ctx: GetServerSidePropsContext | undefined = undefined
) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${cookies["littlecomplete.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      console.log(error);
      if (error.response?.status === 401) {
        if (error.response.data?.message === "token.expired") {
          cookies = parseCookies(ctx);

          const { "littlecomplete.refreshToken": refreshToken } = cookies;

          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;

            api
              .post("auth/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { accessToken } = response.data;

                setCookie(ctx, "littlecomplete.token", accessToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: "/",
                });
                setCookie(
                  ctx,
                  "littlecomplete.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  }
                );

                api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

                failedRequestsQueue.forEach((request: any) =>
                  request.onSuccess(accessToken)
                );
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request: any) =>
                  request.onFailure(err)
                );
                failedRequestsQueue = [];

                if (process.browser) {
                  signOut();
                } else {
                  return Promise.reject(new AuthTokenError());
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (!originalConfig?.headers) {
                  return;
                }

                originalConfig.headers["Authorization"] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
