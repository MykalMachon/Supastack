import useSupabase from 'hooks/useSupabase';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';

type PostFormProps = {
  postId?: string;
};

// NOTE: if postId is not provided, the form is left blank as
// it represents a new post
const PostForm = ({ postId }: PostFormProps) => {
  const client = useSupabase();
  const router = useRouter();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    console.log(client.auth.user().id);
    const postData = {
      title: e.target.title.value,
      content: {
        body: e.target.content.value,
      },
      updated_at: new Date(),
      user_id: client.auth.user().id,
      is_public: true,
    };
    const { data, error } = await client.from('posts').insert(postData);
    if (error)
      // @ts-ignore
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    router.push(`/posts/${data[0].id}`);
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
      <label htmlFor="content">
        Content
        <textarea rows={20} cols={10} name="content" id="content" />
      </label>
      <button onClick={saveDraft} className="secondary" type="submit">
        Save as draft
      </button>
      <button type="submit" disabled={formState.status == 'submitting'}>
        Post
      </button>
    </form>
  );
};

export default PostForm;
