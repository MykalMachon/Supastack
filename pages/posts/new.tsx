import IsAuthenticated from '@components/auth/IsAuthenticated';
import PostForm from '@components/forms/PostForm';
import Head from 'next/head';

const NewPostPage = () => {
  return (
    <>
      <Head>
        <title>Supastack: New Post</title>
        <meta property="og:title" content="Supastack: New Post!" />
      </Head>
      <section className="posts-page container-wrapper">
        <div className="container">
          <h1>New Post</h1>
          <p>Select a title, and write your post below!</p>
          <IsAuthenticated strict>
            <PostForm />
          </IsAuthenticated>
        </div>
      </section>
    </>
  );
};

export default NewPostPage;
