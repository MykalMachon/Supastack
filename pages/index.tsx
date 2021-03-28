import { supabase } from '@utils/supabase';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import IsAuthenticated from '@components/auth/IsAuthenticated';
import PostList from '@components/posts/PostList';
import { getRecentPosts, getUsersPosts } from '@utils/posts';

const Homepage: FC<any> = ({ recentPosts, usersPosts }) => {
  return (
    <>
      <div className="posts container-wrapper">
        <div className="container">
          <IsAuthenticated>
            <section>
              <h1>Your Posts</h1>
              <PostList posts={usersPosts} size="small" />
            </section>
            <section>
              <h2>Recent Posts</h2>
              <PostList posts={recentPosts} size="medium" />
            </section>
          </IsAuthenticated>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  const recentPosts = await getRecentPosts();
  const usersPosts = user ? await getUsersPosts(user.id) : [];
  return {
    props: {
      recentPosts: recentPosts,
      usersPosts: usersPosts,
    },
  };
};

export default Homepage;
