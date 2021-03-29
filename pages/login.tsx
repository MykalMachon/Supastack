import LoginForm from '@components/forms/LoginForm';
import useAuth from 'hooks/useAuth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <>
      <Head>
        <title>Supastack: Login</title>
        <meta property="og:title" content="Supastack: Login" />
      </Head>
      <div className="container-wrapper">
        <section className="container container__auth">
          <LoginForm />
        </section>
      </div>
    </>
  );
};

export default SignInPage;
