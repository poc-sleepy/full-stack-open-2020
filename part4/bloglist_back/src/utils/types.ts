// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: string;
};

type FavoriteBlog = Omit<BlogType, 'url' | 'id'>;

type MostBlogsAuthor = {
  author: string;
  blogs: number;
};

type MostLikesAuthor = {
  author: string;
  likes: number;
};

type UserType = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  blogs: string[];
};

type NewUser = Omit<UserType, 'id'>;

export {
  BlogType,
  FavoriteBlog,
  MostBlogsAuthor,
  MostLikesAuthor,
  UserType,
  NewUser,
};
