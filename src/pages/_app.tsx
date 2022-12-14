import "../styles/globals.css";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Provider as JotaiProvider } from "jotai";
import LIFFInspectorPlugin from "@line/liff-inspector";

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any };
};

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
            liff.ready.then(() => {
              const idToken = liff.getIDToken();
              console.log({ idToken });
            });
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return (
    <JotaiProvider>
      <Component {...pageProps} />
    </JotaiProvider>
  );
}

export default MyApp;
