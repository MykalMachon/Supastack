import useSupabase from 'hooks/useSupabase';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';

type PostFormProps = {
  postId?: string;
};

// NOTE: if postId is not provided, the form is left blank as
// it represents a new post
const PostForm = ({ postId }: PostFormProps) => {
  const client = useSupabase();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    // TODO check validity of the post
    // TODO add post to database
    // if (error) return dispatch({type: 'SUBMIT_ERROR', payload: {err: error}})
    return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  const saveDraft = async (e) => {
    // TODO save the post as a draft
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">
        Title
        <input type="text" name="title" id="title" required />
      </label>
      <label htmlFor="title">
        Body
        <textarea rows={20} cols={10} name="body" id="body" />
      </label>
      <button onClick={saveDraft} className="secondary" type="submit">
        Save as draft
      </button>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
