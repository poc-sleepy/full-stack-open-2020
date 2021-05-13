import mongoose from 'mongoose';

// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: string;
};

interface BlogDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: mongoose.Types.ObjectId;
}

type FavoriteBlog = Omit<BlogType, 'url' | 'id' | 'createdBy'>;

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

interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  name: string;
  passwordHash: string;
  blogs: mongoose.Types.ObjectId[];
}

type NewUser = Omit<UserType, 'id'>;

type UserToken = {
  id: string;
  username: string;
};

export {
  BlogType,
  BlogDocument,
  FavoriteBlog,
  MostBlogsAuthor,
  MostLikesAuthor,
  UserType,
  UserDocument,
  NewUser,
  UserToken,
};
