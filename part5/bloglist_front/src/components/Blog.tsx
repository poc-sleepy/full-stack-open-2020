import React, { useState } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';

import { BlogType, UpdatingBlogType } from '../utils/types';

type Props = {
  blog: BlogType;
  likesBlogHandler: (blog: UpdatingBlogType) => void;
  removeBlogHandler: (blog: BlogType) => void;
};

const Blog: React.FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const likesBlogHandler = (): void => {
    const toUpdateBlog = {
      ...props.blog,
      likes: props.blog.likes + 1,
      createdBy: props.blog.createdBy.id,
    };
    props.likesBlogHandler(toUpdateBlog);
  };

  const removeBlogHandler = (): void => {
    if (
      window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)
    ) {
      props.removeBlogHandler(props.blog);
    }
  };

  return (
    <Box m={2} className="blogCard">
      <Card>
        <CardContent>
          {props.blog.title} {props.blog.author}
          <button
            className="open_button"
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
              <button className="like_button" onClick={likesBlogHandler}>
                like
              </button>
            </p>
            <p>{props.blog.createdBy.name}</p>
            <button className="remove_button" onClick={removeBlogHandler}>
              remove
            </button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Blog;
