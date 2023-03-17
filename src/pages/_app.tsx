import { Ubuntu } from "@next/font/google";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ubuntu = Ubuntu({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <main className="poppins.classname">
        <ToastContainer />
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
