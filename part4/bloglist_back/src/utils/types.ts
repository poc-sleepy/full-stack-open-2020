// mongooseのモデルと名前がかぶるので、BlogではなくBlogTypeという名前にしている
type BlogType = {
  title: string;
  author: string;
  url: string;
  likes: number;
};

export { BlogType };
