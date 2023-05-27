import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { ChakraProvider } from "@chakra-ui/react";

import { AppProvider } from "@/contexts";
import { queryClient } from "@/lib/queryClient";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AppProvider>
            <main className="inter.classname">
              <ToastContainer theme={"colored"} />
              <Component {...pageProps} />
            </main>
          </AppProvider>
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
}
