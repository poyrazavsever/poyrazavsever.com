import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-white dark:bg-neutral-800 transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
