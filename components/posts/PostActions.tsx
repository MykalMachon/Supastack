import IsAuthenticated from '@components/auth/IsAuthenticated';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
import LikeButton from './LikeButton';
import styles from './PostActions.module.scss';

const PostActions = ({ post }) => {
  const { user } = useAuth();

  return (
    <div>
      <IsAuthenticated>
        {user?.id === post.user_id.id ? (
          <Link href={`/posts/${post.id}/edit`}>
            <a>edit post</a>
          </Link>
        ) : (
          <LikeButton post={post} />
        )}
      </IsAuthenticated>
    </div>
  );
};

export default PostActions;
