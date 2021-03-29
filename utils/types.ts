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

export type IconProps = {
  active?: boolean;
};
