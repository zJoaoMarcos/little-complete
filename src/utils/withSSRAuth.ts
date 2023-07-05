import { AuthTokenError } from "@/errors/AuthTokenError";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";

export function withSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    if (!cookies["littlecomplete.token"]) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, "littlecomplete.refreshToken");
        destroyCookie(ctx, "littlecomplete.token");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  };
}
