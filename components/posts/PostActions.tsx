import IsAuthenticated from '@components/auth/IsAuthenticated';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import styles from './PostActions.module.scss';

const PostActions = ({ post }) => {
  const { user } = useAuth();

  const likePost = () => {
    // STUB this should like the post
    // OR unlike it, if it's already liked
  };

  return (
    <div>
      <IsAuthenticated>
        {user?.id === post.user_id.id ? (
          <Link href={`/posts/${post.id}/edit`}>
            <a>edit post</a>
          </Link>
        ) : (
          <button onClick={likePost} className={styles['post__actions__like']}>
            <img src="/heart.svg" alt="heart icon" />
          </button>
        )}
      </IsAuthenticated>
    </div>
  );
};

export default PostActions;
