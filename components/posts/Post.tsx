import styles from './Post.module.scss';

const Post = ({ post }) => {
  return (
    <article className={`${styles['post__content']} container`}>
      <div className={styles['post__content__body']}>
        <h1>{post.title}</h1>
        <p>{post.content.body}</p>
      </div>
      <aside className={styles['post__content__author']}>
        <p className={styles['author__intro']}>written by...</p>
        <p className={styles['author__name']}>{post.user_id.display_name}</p>
        <p className={styles['author__bio']}>{post.user_id.description}</p>
      </aside>
    </article>
  );
};

export default Post;
