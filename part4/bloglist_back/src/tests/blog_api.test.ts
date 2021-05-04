import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from '../app';
import { Blog } from '../models/blog';
import { BlogType } from '../utils/types';
import { helper } from './test_helper';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/blogs');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const blogs = response.body;
    const expectedBlog: BlogType = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    };
    expect(blogs).toContainEqual(expectedBlog);
  });

  test('a specific blog has correct properties', async () => {
    const response = await api.get('/api/blogs');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const blog = response.body[0];
    expect(blog.id).toBeDefined();
    expect(blog.title).toBeDefined();
    expect(blog.author).toBeDefined();
    expect(blog.url).toBeDefined();
    expect(blog.likes).toBeDefined();
    expect(blog._id).toBeUndefined();
    expect(blog.__v).toBeUndefined();
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
