import useSupabase from 'hooks/useSupabase';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';
import Link from 'next/link';

const SigninForm = () => {
  const client = useSupabase();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const { user, error } = await client.auth.signIn(
      {
        email: e.target.email.value,
        password: e.target.password.value,
      },
      {
        redirectTo: '/',
      }
    );
    if (error) {
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    }
    if (user) return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  return (
    <form className="authForm" action="" onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      {/* @ts-ignore */}
      {formState.error ? <p>{formState.error.message}</p> : null}
      <label htmlFor="email">
        Email
        <input type="email" name="email" id="email" />
      </label>
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" />
      </label>
      <button type="submit" disabled={formState.status == 'submitting'}>
        Signin
      </button>
      <p>
        Don't have an account? <Link href={'/signup'}>sign up!</Link>
      </p>
    </form>
  );
};

export default SigninForm;
