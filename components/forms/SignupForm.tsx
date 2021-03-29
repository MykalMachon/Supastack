import useSupabase from 'hooks/useSupabase';
import Link from 'next/link';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';

const SignupForm = () => {
  const client = useSupabase();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const { user, error } = await client.auth.signUp({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (error)
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    if (user) return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  return (
    <form className="authForm" action="" onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
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
        Signup
      </button>
      {formState.status == 'success' ? <p>check your email!</p> : null}
      <p>
        Already have an account? <Link href={'/login'}>login!</Link>
      </p>
    </form>
  );
};

export default SignupForm;
