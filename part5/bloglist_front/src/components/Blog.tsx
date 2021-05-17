import React, { useState } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';

import { BlogType } from '../utils/types';

type Props = {
  blog: BlogType;
};

const Blog: React.FC<Props> = ({ blog }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Box m={2}>
      <Card>
        <CardContent>
          {blog.title} {blog.author}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? 'hide' : 'view'}
          </button>
          <div style={{ display: isOpen ? '' : 'none' }}>
            <p>{blog.url}</p>
            <p>
              likes: {blog.likes}
              <button>like</button>
            </p>
            <p>{blog.createdBy.name}</p>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
