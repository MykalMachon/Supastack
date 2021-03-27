import Link from 'next/link';

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.length ? (
        <>
          {posts.map((post) => {
            return (
              <article key={post.id}>
                <p>{post.title}</p>
                <Link href={`/posts/${post.id}`}>
                  <a>Read more</a>
                </Link>
              </article>
            );
          })}
        </>
      ) : (
        <p>No Posts available</p>
      )}
    </div>
  );
};

export default PostList;
