import IsAuthenticated from '@components/auth/IsAuthenticated';
import PostForm from '@components/forms/PostForm';
import { supabase } from '@utils/supabase';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const EditPostPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>Supastack: editing {post.title}</title>
      </Head>
      <section className="posts-edit container-wrapper">
        <div className="container">
          <h1>Edit Post</h1>
          <IsAuthenticated strict>
            <PostForm post={post} type="edit" />
          </IsAuthenticated>
        </div>
      </section>
    </>
  );
};

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // get the post
  const { pid } = params;
  const { data: post } = await supabase
    .from('posts')
    .select(
      `
      id,
      title,
      content,
      created_at,
      user_id (
        id,
        display_name,
        description
      )
    `
    )
    .filter('id', 'eq', pid)
    .single();

  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user.id !== post.user_id.id) {
    // this means someone's trying to edit someone elses post... no good!
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      post: post,
    },
  };
};
