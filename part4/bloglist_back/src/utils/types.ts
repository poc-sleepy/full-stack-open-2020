// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
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

export { BlogType, FavoriteBlog, MostBlogsAuthor, MostLikesAuthor };
