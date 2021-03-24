import SigninForm from '@components/forms/SigninForm';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignInPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <main>
      <h1>Sign In</h1>
      <SigninForm />
    </main>
  );
};

export default SignInPage;
