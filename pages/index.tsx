import IsAuthenticated from '@components/auth/IsAuthenticated';
import PostList from '@components/posts/PostList';
import { supabase } from '@utils/supabase';
import { GetServerSideProps } from 'next';
import { FC, useEffect, useState } from 'react';

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
  //  get 5 most recent posts
  const { data: recentPosts } = await supabase.from('posts').select().limit(5);
  // get posts by the logged in user
  const { user } = await supabase.auth.api.getUserByCookie(req);
  let usersPosts = [];
  if (user) {
    const { data: rawUsersPosts } = await supabase
      .from('posts')
      .select()
      .filter('user_id', 'eq', user.id);
    usersPosts = rawUsersPosts;
  }
  return {
    props: {
      recentPosts: recentPosts,
      usersPosts: usersPosts,
    },
  };
};

export default Homepage;
