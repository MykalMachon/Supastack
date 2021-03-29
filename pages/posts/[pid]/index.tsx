import Post from '@components/posts/Post';
import { convertMdToHtml } from '@utils/posts';
import { supabase } from '@utils/supabase';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

const PostPage = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content={`Supastack: ${post.title}`} />
      </Head>
      <div className="container-wrapper">
        <Post post={post} />
      </div>
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pid } = context.params;

  const { data: rawPost } = await supabase
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

  if (!rawPost) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const post = {
    ...rawPost,
    content: {
      body: convertMdToHtml(rawPost.content.body),
    },
  };

  return {
    props: {
      pid: pid,
      post: post,
    },
  };
};
