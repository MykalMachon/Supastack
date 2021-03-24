import SignupForm from '@components/forms/SignupForm';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SignUpPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <main>
      <h1>Sign Up</h1>
      <SignupForm />
    </main>
  );
};

export default SignUpPage;
