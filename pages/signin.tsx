import SigninForm from '@components/forms/SigninForm';
import useSupabase from 'hooks/useSupabase';
import { useReducer } from 'react';

const SignInPage = () => {
  return (
    <main>
      <h1>Sign In</h1>
      <SigninForm />
    </main>
  );
};

export default SignInPage;
