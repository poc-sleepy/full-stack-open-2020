import mongoose from 'mongoose';
import supertest from 'supertest';

import { app } from '../app';
import { User } from '../models/user';
import { UserType } from '../utils/types';
import { helper } from './test_helper';

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(await helper.getInitialUsers());
});

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength((await helper.getInitialUsers()).length);
  });

  test('a specific blog is within the returned notes', async () => {
    const response = await api.get('/api/users');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const users: UserType[] = response.body;
    const usernames = users.map((u) => u.username);
    expect(usernames).toContain((await helper.getInitialUsers())[0].username);
  });

  test('a specific blog has correct properties', async () => {
    const response = await api.get('/api/users');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = response.body[0];
    expect(user.id).toBeDefined();
    expect(user.username).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.passwordHash).toBeUndefined();
    expect(user._id).toBeUndefined();
    expect(user.__v).toBeUndefined();
  });
});

describe('addition of a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'fullstackopen',
      name: 'Helsinki Univ.',
      password: 'password',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(
      (await helper.getInitialUsers()).length + 1
    );

    const addedUser = usersAtEnd.find(
      (user) => user.username === newUser.username
    );
    expect(addedUser).toBeDefined();
  });

  test('fails without username', async () => {
    const newUser = {
      name: 'Helsinki Univ.',
      password: 'password',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toBe('Invalid username: undefined');

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with too short username', async () => {
    const newUser = {
      username: 'fs',
      name: 'Helsinki Univ.',
      password: 'pw',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toBe(
      `Invalid username: ${newUser.username} (username needs 3 characters at least.)`
    );

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails without password', async () => {
    const newUser = {
      username: 'fullstackopen',
      name: 'Helsinki Univ.',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toBe('Invalid password: undefined');

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with too short password', async () => {
    const newUser = {
      username: 'fullstackopen',
      name: 'Helsinki Univ.',
      password: 'pw',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toBe(
      `Invalid password: ${newUser.password} (password needs 3 characters at least.)`
    );

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('fails with duplicated username', async () => {
    const newUser = {
      username: 'root',
      name: 'Helsinki Univ.',
      password: 'password',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    expect(response.body.error).toBe(
      `User validation failed: username: Error, expected \`username\` to be unique. Value: \`${newUser.username}\``
    );

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  void mongoose.connection.close();
});
