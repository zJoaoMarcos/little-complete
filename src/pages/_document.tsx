import { ColorModeScript } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import theme from "../styles/theme/index";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
