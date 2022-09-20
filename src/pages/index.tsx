import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-red-500">liff-app powered by mu0363</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
      </main>
    </div>
  );
};

export default Home;
