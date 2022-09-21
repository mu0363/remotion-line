import "../styles/globals.css";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";
import { NextComponentType, NextPageContext } from "next";
import { Provider } from "react-redux";
import { store } from "src/libs/store";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { idTokenAtom } from "src/libs/jotai/atom";

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & { layoutProps: any };
};

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [idToken, setIdToken] = useAtom(idTokenAtom);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");
            setLiffObject(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, [setIdToken, idToken]);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return (
    <JotaiProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </JotaiProvider>
  );
}

export default MyApp;
