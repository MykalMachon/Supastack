import Link from 'next/link';
import styles from './PostCard.module.scss';

type PostCardProps = {
  size: 'small' | 'medium';
  post: any;
};

const PostCard = ({ size, post }: PostCardProps) => {
  switch (size) {
    case 'small':
      return (
        <article className={styles['post-card__small']}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>
            <a>Read more</a>
          </Link>
        </article>
      );
    case 'medium':
      return (
        <article className={styles['post-card__medium']}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>
            <a>Read more</a>
          </Link>
        </article>
      );
  }
};

export default PostCard;
