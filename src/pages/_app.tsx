import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "@/services/store";
import { appWithTranslation } from "next-i18next";

import RootLayout from "../components/Layouts/RootLayout";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Little Knits Story" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>Little Knits Story</title>
      </Head>
      <Provider store={store}>
        <RootLayout>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          />
          <Component {...pageProps} />
        </RootLayout>
      </Provider>
    </>
  );
}

export default appWithTranslation(MyApp);
