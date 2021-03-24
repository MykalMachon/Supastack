import { AuthProvider } from '@components/context/AuthContext';
import { SupaProvider } from '@components/context/SupaContext';
import { AppProps } from 'next/dist/next-server/lib/router/router';

const SupastackApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SupaProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SupaProvider>
  );
};

export default SupastackApp;
