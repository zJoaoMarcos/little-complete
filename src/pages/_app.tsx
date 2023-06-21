import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { AppProvider } from "@/contexts";
import { queryClient } from "@/services/queryClient";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AppProvider>
            <main>
              <ToastContainer theme={"colored"} />
              {getLayout(<Component {...pageProps} />)}
            </main>
          </AppProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
