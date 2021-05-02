// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  _id?: string;
  __v?: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

type FavoriteBlog = Omit<BlogType, 'url' | '_id' | '__v'>;

export { BlogType, FavoriteBlog };
