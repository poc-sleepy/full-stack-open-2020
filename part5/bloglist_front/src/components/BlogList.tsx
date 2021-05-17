import React from 'react';
import { BlogType } from '../utils/types';
import Blog from './Blog';

type Props = {
  blogs: BlogType[];
  likesBlogHandler: (blog: BlogType) => void;
};

const BlogList: React.FC<Props> = (props: Props) => (
  <>
    {props.blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likesBlogHandler={props.likesBlogHandler}
      />
    ))}
  </>
);

export default BlogList;
