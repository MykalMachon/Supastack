export type Post = {
  id: string;
  title: string;
  content: {
    body: string;
  };
  created_at: string;
  updated_at: string;
  user_id: string;
  is_public: boolean;
};

export type User = {
  id: string;
  email: string;
  display_name?: string;
  description?: string;
};

export type IconProps = {
  active?: boolean;
};
