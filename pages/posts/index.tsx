import Link from 'next/link';

const AllPostsPage = () => {
  return (
    <section className="posts-page container-wrapper">
      <div className="container">
        <h1>All Recent Posts</h1>
        <p>These are all the recent public posts on supastack</p>
        <section className="posts">
          <Link href="/posts/my-post">My Post</Link>
        </section>
      </div>
    </section>
  );
};

export default AllPostsPage;
