import Post from '@components/posts/Post';
import PostActions from '@components/posts/PostActions';
import { convertMdToHtml } from '@utils/posts';
import { supabase } from '@utils/supabase';
import { GetServerSideProps } from 'next';

const EditPostPage = ({ post }) => {
  return (
    <div className="container-wrapper">
      <Post post={post} />
    </div>
  );
};

export default EditPostPage;

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
