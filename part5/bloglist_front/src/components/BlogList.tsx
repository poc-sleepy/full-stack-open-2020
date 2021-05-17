import React from 'react';
import { BlogType, UpdatingBlogType } from '../utils/types';
import Blog from './Blog';

type Props = {
  blogs: BlogType[];
  likesBlogHandler: (blog: UpdatingBlogType) => void;
  removeBlogHandler: (blog: BlogType) => void;
};

const BlogList: React.FC<Props> = (props: Props) => (
  <>
    {props.blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likesBlogHandler={props.likesBlogHandler}
        removeBlogHandler={props.removeBlogHandler}
      />
    ))}
  </>
);

export default BlogList;
