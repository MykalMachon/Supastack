import { AuthProvider } from '@components/context/AuthContext';
import { SupaProvider } from '@components/context/SupaContext';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Layout from '@components/layout/Layout';
import Head from 'next/head';

import '@styles/main.scss';
import '@styles/atom-one-dark.css';

const SupastackApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SupaProvider>
      <AuthProvider>
        <Layout>
          <Head>
            <title>Supastack</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta property="og:title" content="Supastack" />
            <meta
              property="og:description"
              content="A minimal blogging platform."
            />
            <meta
              property="og:image"
              content="https://supastack.netlify.app/supastack-meta.png"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SupaProvider>
  );
};

export default SupastackApp;
