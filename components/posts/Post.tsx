import styles from './Post.module.scss';
import PostActions from './PostActions';

const Post = ({ post }) => {
  return (
    <article className={`${styles['post__content']} container`}>
      <div className={styles['post__content__body']}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.body }} />
      </div>
      <aside className={styles['post__content__author']}>
        <p className={styles['author__intro']}>written by...</p>
        <p className={styles['author__name']}>{post.user_id.display_name}</p>
        <p className={styles['author__bio']}>{post.user_id.description}</p>
        <PostActions post={post} />
      </aside>
    </article>
  );
};

export default Post;
