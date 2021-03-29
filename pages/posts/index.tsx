import PostList from '@components/posts/PostList';
import Head from 'next/head';

const AllPostsPage = () => {
  return (
    <>
      <Head>
        <title>Supastack: Recent Posts</title>
        <meta property="og:title" content="Supastack: Recent Posts" />
      </Head>
      <section className="posts-page container-wrapper">
        <div className="container">
          <h1>All Recent Posts</h1>
          <p>These are all the recent public posts on supastack</p>
          <PostList posts={[]} size="medium" />
        </div>
      </section>
    </>
  );
};

export default AllPostsPage;
