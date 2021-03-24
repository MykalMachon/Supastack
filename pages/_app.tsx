import { AuthProvider } from '@components/context/AuthContext';
import { SupaProvider } from '@components/context/SupaContext';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Layout from '@components/layout/Layout';

import '@styles/main.scss';

const SupastackApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SupaProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SupaProvider>
  );
};

export default SupastackApp;
