import React from 'react';

import { BlogType } from '../utils/types';

type Props = {
  blog: BlogType;
};

const Blog: React.FC<Props> = ({ blog }: Props) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
