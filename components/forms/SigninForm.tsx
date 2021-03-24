import useSupabase from 'hooks/useSupabase';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { formReducer, FormState } from './utils';

const SigninForm = () => {
  const client = useSupabase();
  const router = useRouter();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  useEffect(() => {
    if (client.auth.user != null) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const { user, error } = await client.auth.signIn({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(user);
    if (error)
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    if (user) return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {formState.error ? <p>{formState.error}</p> : null}
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
    </form>
  );
};

export default SigninForm;
