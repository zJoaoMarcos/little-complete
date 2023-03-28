import { Ubuntu } from "next/font/google";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { SidebarDrawerProvider } from "@/contexts/SidebarDrawerContext";
import { StockProvider } from "@/contexts/StockContext";
import { queryClient } from "@/lib/queryClient";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ubuntu = Ubuntu({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <StockProvider>
            <SidebarDrawerProvider>
              <main className="ubuntu.classname">
                <ToastContainer theme={"colored"} />
                <Component {...pageProps} />
              </main>
            </SidebarDrawerProvider>
          </StockProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
