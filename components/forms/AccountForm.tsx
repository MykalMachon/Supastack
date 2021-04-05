import { User } from '@utils/types';
import useSupabase from 'hooks/useSupabase';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';
import { sanitize } from 'dompurify';

type AccountFormProps = {
  user?: User;
};

const AccountForm = ({ user }: AccountFormProps) => {
  const client = useSupabase();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const accountData = {
      display_name: e.target.displayName.value,
      description: sanitize(e.target.description.value),
    };
    const { error } = await client
      .from('users')
      .update(accountData)
      .match({ id: user.id });
    if (error) {
      // @ts-ignore
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    }
    return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* @ts-ignore */}
      {formState.error ? <p>{formState.error.message}</p> : null}
      <label htmlFor="displayName">
        Display Name
        <input
          type="text"
          name="displayName"
          id="displayName"
          defaultValue={user.display_name || ''}
          required
        />
      </label>
      <label htmlFor="description">
        Description
        <textarea
          rows={3}
          cols={10}
          name="description"
          id="description"
          defaultValue={user.description || ''}
          placeholder={'write a bit about yourself!'}
        />
      </label>
      {formState.status == 'success' && (
        <p>Your account settings were saved!</p>
      )}
      <button type="submit" disabled={formState.status == 'submitting'}>
        Save Changes
      </button>
    </form>
  );
};

export default AccountForm;
