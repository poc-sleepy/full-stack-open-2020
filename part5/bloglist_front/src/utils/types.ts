export type BlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: Omit<UserType, 'blogs'>
};

export type NewBlogType = Omit<BlogType, 'id' | 'likes' | 'createdBy'>;

export type UpdatingBlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: string;
};

export type UserType = {
  id: string;
  username: string;
  name: string;
  blogs: string[];
};

export type NewUserType = Omit<UserType, 'id'>;

export type UserTokenType = {
  username: string;
  name: string;
  token: string;
};
