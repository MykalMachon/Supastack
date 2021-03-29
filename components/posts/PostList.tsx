import { Post } from '@utils/types';
import PostCard from './PostCard';
import styles from './PostList.module.scss';

type PostListProps = {
  size: 'small' | 'medium';
  posts: Array<Post>;
};

const PostList = ({ posts, size }: PostListProps) => {
  return (
    <div className={styles[`post-list__${size}`]}>
      {posts.length ? (
        <>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} size={size} />
          ))}
        </>
      ) : (
        <p>No Posts available</p>
      )}
    </div>
  );
};

export default PostList;
