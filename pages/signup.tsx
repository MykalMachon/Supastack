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
    <div className="container-wrapper">
      <section className="container container__auth">
        <SignupForm />
      </section>
    </div>
  );
};

export default SignUpPage;
