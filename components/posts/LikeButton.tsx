import LikeIcon from '@components/icons/LikeIcon';
import { Post } from '@utils/types';
import useAuth from 'hooks/useAuth';
import useSupabase from 'hooks/useSupabase';
import { useEffect, useState } from 'react';

type LikeButtonProps = {
  post: Post;
};

const LikeButton = ({ post }: LikeButtonProps) => {
  const client = useSupabase();
  const { user } = useAuth();
  const [userLikesPost, setUserLikesPost] = useState(null);

  useEffect(() => {
    const seeIfPostLiked = async () => {
      const { data: like } = await client
        .from('likes')
        .select()
        .filter('user_id', 'eq', user.id)
        .filter('post_id', 'eq', post.id)
        .single();
      setUserLikesPost(like ? like : false);
    };
    seeIfPostLiked();
  }, []);

  const likePost = async () => {
    if (userLikesPost == false) {
      // Like the post
      const { data: like, error } = await client
        .from('likes')
        .insert({ user_id: user.id, post_id: post.id })
        .single();
      if (error) throw new Error(error.message);
      setUserLikesPost(like);
    } else {
      // unlike the post
      const { error } = await client
        .from('likes')
        .delete()
        .match({ id: userLikesPost.id });
      if (error) throw new Error(error.message);
      setUserLikesPost(false);
    }
  };

  return (
    <button onClick={likePost} disabled={userLikesPost === null}>
      <LikeIcon />{' '}
      {userLikesPost == false ? (
        <span>Like Post</span>
      ) : (
        <span>Unlike Post</span>
      )}
    </button>
  );
};

export default LikeButton;
