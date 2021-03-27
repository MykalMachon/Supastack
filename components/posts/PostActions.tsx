import styles from './PostActions.module.scss';

const PostActions = ({ post }) => {
  const likePost = () => {
    // STUB this should like the post
    // OR unlike it, if it's already liked
  };

  return (
    <div className="container">
      <button onClick={likePost} className={styles['post__actions__like']}>
        <img src="/heart.svg" alt="heart icon" />
      </button>
    </div>
  );
};

export default PostActions;
