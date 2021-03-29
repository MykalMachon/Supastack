import useSupabase from 'hooks/useSupabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { formReducer, FormState } from './utils';

type PostFormProps = {
  post?: any;
  type?: 'new' | 'edit';
};

const PostForm = ({ post, type = 'new' }: PostFormProps) => {
  const client = useSupabase();
  const router = useRouter();

  const initState: FormState = { status: 'idle', error: null };
  const [currPost, setCurrPost] = useState(post || null);
  const [formState, dispatch] = useReducer(formReducer, initState);

  useEffect(() => {
    if (formState.status === 'success' && currPost) {
      router.push(`/posts/${currPost.id}`);
    }
  }, [formState]);

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
        const { data: newPost, error: newError } = await client
          .from('posts')
          .insert(postData);
        if (newError)
          // @ts-ignore
          return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
        setCurrPost(newPost[0]);

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

  const deletePost = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_FORM' });
    const { error } = await client
      .from('posts')
      .delete()
      .match({ id: post.id });
    if (error) {
      // @ts-ignore
      return dispatch({ type: 'SUBMIT_ERROR', payload: { err: error } });
    }
    router.push('/');
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
          rows={15}
          cols={10}
          name="content"
          id="content"
          defaultValue={post?.content?.body || ''}
        />
      </label>
      <button type="submit" disabled={formState.status == 'submitting'}>
        {type == 'new' ? 'Post' : 'Save Changes'}
      </button>
      {type == 'edit' && <button onClick={deletePost}>Delete Post</button>}
    </form>
  );
};

export default PostForm;
