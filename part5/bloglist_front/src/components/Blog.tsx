import React, { useState } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';

import { BlogType } from '../utils/types';

type Props = {
  blog: BlogType;
  likesBlogHandler: (blog: BlogType) => void;
};

const Blog: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const likesBlogHandler = (): void => {
    const toUpdateBlog = {
      ...props.blog,
      likes: props.blog.likes + 1,
    };
    props.likesBlogHandler(toUpdateBlog);
  };

  return (
    <Box m={2}>
      <Card>
        <CardContent>
          {props.blog.title} {props.blog.author}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? 'hide' : 'view'}
          </button>
          <div style={{ display: isOpen ? '' : 'none' }}>
            <p>{props.blog.url}</p>
            <p>
              likes: {props.blog.likes}
              <button onClick={likesBlogHandler}>like</button>
            </p>
            <p>{props.blog.createdBy.name}</p>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
