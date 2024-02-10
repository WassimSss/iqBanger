import '../styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>IQBanger</title>
        <link rel="icon" href="/strawberry.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
