import useSupabase from 'hooks/useSupabase';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import { formReducer, FormState } from './utils';

type PostFormProps = {
  post?: any;
  type?: 'new' | 'edit';
};

// NOTE: if postId is not provided, the form is left blank as
// it represents a new post
const PostForm = ({ post, type = 'new' }: PostFormProps) => {
  const client = useSupabase();

  const initState: FormState = { status: 'idle', error: null };
  const [formState, dispatch] = useReducer(formReducer, initState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const postData = {
      title: e.target.title.value,
      content: {
        body: e.target.content.value,
      },
      updated_at: new Date(),
      user_id: client.auth.user().id,
      is_public: true,
    };
    switch (type) {
      case 'new':
        const { error: newError } = await client.from('posts').insert(postData);
        if (newError)
          // @ts-ignore
          return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
        break;
      case 'edit':
        const { error: editError } = await client
          .from('posts')
          .update(postData)
          .match({ id: post.id });
        if (editError)
          // @ts-ignore
          return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
        break;
    }
    return dispatch({ type: 'SUBMIT_SUCCESS' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* @ts-ignore */}
      {formState.error ? <p>{formState.error.message}</p> : null}
      <label htmlFor="title">
        Title
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={post?.title || ''}
          required
        />
      </label>
      <label htmlFor="content">
        Content
        <textarea
          rows={20}
          cols={10}
          name="content"
          id="content"
          defaultValue={post?.content?.body || ''}
        />
      </label>
      <button type="submit" disabled={formState.status == 'submitting'}>
        Post
      </button>
    </form>
  );
};

export default PostForm;
