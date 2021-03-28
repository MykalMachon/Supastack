import { supabase } from './supabase';
import { Post } from './types';
import { Converter } from 'showdown';

/**
 * get all posts made by the user
 *
 * @param userId the logged in user's ID
 */
export const getUsersPosts = async (
  userId: string
): Promise<Array<Post> | null> => {
  const { data, error } = await supabase
    .from<Post>('posts')
    .select(
      `
    id,
    title,
    created_at,
    updated_at,
    user_id (
      id,
      email,
      display_name
    )
    `
    )
    .order('updated_at', { ascending: false })
    .filter('user_id', 'eq', userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * get 10 most recent posts from supabase
 */
export const getRecentPosts = async (): Promise<Array<Post>> => {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
    id,
    title,
    created_at,
    updated_at,
    user_id (
      id,
      email,
      display_name
    )
    `
    )
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const convertMdToHtml = (postBody: string): string => {
  const converter = new Converter();
  return converter.makeHtml(postBody);
};
