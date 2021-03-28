import Link from 'next/link';
import styles from './PostCard.module.scss';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type PostCardProps = {
  size: 'small' | 'medium';
  post: any;
};

const PostCard = ({ size, post }: PostCardProps) => {
  switch (size) {
    case 'small':
      return (
        <article className={styles['post-card__small']}>
          <div>
            <p className={styles['post-card__title']}>{post.title}</p>
            <p className={styles['post-card__date']}>
              last edited {dayjs(post.updated_at).fromNow()}
            </p>
          </div>
          <Link href={`/posts/${post.id}`}>
            <a>Read more</a>
          </Link>
        </article>
      );
    case 'medium':
      return (
        <article className={styles['post-card__medium']}>
          <p className={styles['post-card__author']}>
            {post.user_id.display_name}
          </p>
          <p className={styles['post-card__title']}>{post.title}</p>
          <p className={styles['post-card__date']}>
            posted on {dayjs(post.created_at).format('MMMM D')}
          </p>
          <Link href={`/posts/${post.id}`}>
            <a>Read more</a>
          </Link>
        </article>
      );
  }
};

export default PostCard;
