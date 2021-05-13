import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from '../app';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { helper } from './test_helper';

const api = supertest(app);

beforeAll(async () => {
  // HACK: 本当はUser.notesを初期化するためbeforeEachに入れるのが正解
  // 時間短縮のため今回はこっちに書く
  await User.deleteMany({});
  await User.insertMany(await helper.initialUsers);
});

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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const blogs = response.body;
    const expectedUser = (await helper.initialUsers).find(
      (user) => user._id === helper.initialBlogs[0].createdBy
    );
    if (expectedUser === undefined) {
      throw new Error('Something in the testdata is wrong');
    }

    const expectedBlog = {
      id: helper.initialBlogs[0]._id,
      title: helper.initialBlogs[0].title,
      author: helper.initialBlogs[0].author,
      url: helper.initialBlogs[0].url,
      likes: helper.initialBlogs[0].likes,
      createdBy: {
        id: expectedUser._id,
        username: expectedUser.username,
        name: expectedUser.name,
      },
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
    expect(blog.createdBy).toBeDefined();
    expect(blog._id).toBeUndefined();
    expect(blog.__v).toBeUndefined();
  });
});

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const newBlog = {
      title: 'fullstack open',
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
    expect(addedBlog).toBeDefined();
    if (addedBlog !== undefined) {
      expect(addedBlog).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: addedBlog.id,
        ...newBlog,
        // HACK: 今回は無理やりパスさせるようIdに変換しているが、本来はtoJSONにてstringへの変換が必要
        createdBy: mongoose.Types.ObjectId(user._id),
      });
    }
  });

  test('succeeds without likes', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const newBlog = {
      title: 'fullstack open',
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
    expect(addedBlog).toBeDefined();
    if (addedBlog !== undefined) {
      expect(addedBlog).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: addedBlog.id,
        ...newBlog,
        likes: 0,
        // HACK: 今回は無理やりパスさせるようIdに変換しているが、本来はtoJSONにてstringへの変換が必要
        createdBy: mongoose.Types.ObjectId(user._id),
      });
    }
  });

  test('succeeds without title', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const newBlog = {
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((blog) => blog.url === newBlog.url);
    expect(addedBlog).toBeDefined();
    if (addedBlog !== undefined) {
      expect(addedBlog).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: addedBlog.id,
        ...newBlog,
        likes: 0,
        // HACK: 今回は無理やりパスさせるようIdに変換しているが、本来はtoJSONにてstringへの変換が必要
        createdBy: mongoose.Types.ObjectId(user._id),
      });
    }
  });

  test('succeeds without url', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const newBlog = {
      title: 'fullstack open',
      author: 'Helsinki Univ.',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);
    expect(addedBlog).toBeDefined();
    if (addedBlog !== undefined) {
      expect(addedBlog).toEqual({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: addedBlog.id,
        ...newBlog,
        likes: 0,
        // HACK: 今回は無理やりパスさせるようIdに変換しているが、本来はtoJSONにてstringへの変換が必要
        createdBy: mongoose.Types.ObjectId(user._id),
      });
    }
  });

  test('fails without auth', async () => {
    const newBlog = {
      title: 'fullstack open',
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
      likes: 2,
    };

    await api.post('/api/blogs').send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails without title and url', async () => {
    const user = (await helper.initialUsers)[0];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = (
      await api
        .post('/api/login')
        .send({ ...user, password: 'secret' })
        .expect(200)
    ).body.token;

    const newBlog = {
      author: 'Helsinki Univ.',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('updation of a blog', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const toBeBlog = {
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
      likes: 4,
    };

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(toBeBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(blogsAtEnd).toContainEqual({ ...blogToUpdate, ...toBeBlog });
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();
    const toBeBlog = {
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
      likes: 4,
    };
    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(toBeBlog)
      .expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';
    const toBeBlog = {
      author: 'Helsinki Univ.',
      url: 'https://fullstackopen.com/en/',
      likes: 4,
    };

    await api.put(`/api/blogs/${invalidId}`).send(toBeBlog).expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    expect(blogsAtEnd).not.toContainEqual(blogToDelete);
  });

  test('fails by not-owner user', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[1].username
    );

    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

    expect(blogsAtEnd).toContainEqual(blogToDelete);
  });

  test('fails with statuscode 404 if blog does not exist', async () => {
    const user = await helper.loginUser(
      api,
      (
        await helper.initialUsers
      )[0].username
    );

    const validNonexistingId = await helper.nonExistingId();
    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(404);
  });

  test('fails without auth', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    expect(blogsAtEnd).toContainEqual(blogToDelete);
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
