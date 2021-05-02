// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  _id?: string;
  __v?: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

export { BlogType };
