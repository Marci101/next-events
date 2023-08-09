import Head from 'next/head';
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {        // this file ("_app.js") is like the root component inside of the body element
  return (
    <Layout>
      <Head>                                      {/* a Head Element to added its children elements universally to all subpages - if these elements not added there */}
        <title>Next Events</title>                {/* NextJS MERGING similar Head datas (children elements) and it keeps the latest one what comes in line */}
        <meta name="description" content="NextJS Events" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;