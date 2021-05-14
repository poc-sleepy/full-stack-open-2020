export type BlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: string;
};

export type NewBlogType = Omit<BlogType, 'id'>;

export type UserType = {
  id: string;
  username: string;
  name: string;
  blogs: string[];
};

export type NewUserType = Omit<UserType, 'id'>;

export type UserTokenType = {
  id: string;
  username: string;
  token: string;
};
