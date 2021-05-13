import bcrypt from 'bcrypt';
import supertest from 'supertest';

import { Blog } from '../models/blog';
import { User } from '../models/user';

export type TestBlogType = {
  _id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdBy: string;
};

const initialBlogs: TestBlogType[] = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    createdBy: '609769e9208b4d3728dc3557',
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    createdBy: '6097cffa013ba926541808df',
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    createdBy: '609769e9208b4d3728dc3557',
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10,
    createdBy: '609769e9208b4d3728dc3557',
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    createdBy: '6097716d976d7012184fb65b',
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    createdBy: '6097cffa013ba926541808df',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.remove();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const id: string = blog.toJSON().id;
  return id;
};

export type TestUserType = {
  _id: string;
  username: string;
  name: string;
  passwordHash: string;
  blogs: string[];
};

const initialUsers = (async () => {
  const passwordHash = await bcrypt.hash('secret', 10);
  const initialUsers: TestUserType[] = [
    {
      _id: '609769e9208b4d3728dc3557',
      username: 'root',
      name: 'Root User',
      passwordHash,
      blogs: [
        '5a422a851b54a676234d17f7',
        '5a422b3a1b54a676234d17f9',
        '5a422b891b54a676234d17fa',
      ],
    },
    {
      _id: '6097716d976d7012184fb65b',
      username: 'admin',
      name: 'Administrator',
      passwordHash,
      blogs: ['5a422ba71b54a676234d17fb'],
    },
    {
      _id: '6097cffa013ba926541808df',
      username: 'kinaly',
      name: 'Kinaly',
      passwordHash,
      blogs: ['5a422aa71b54a676234d17f8', '5a422bc61b54a676234d17fc'],
    },
  ];
  return initialUsers;
})();

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const loginUser = async (
  api: supertest.SuperTest<supertest.Test>,
  username: string
) => {
  const user = (await helper.initialUsers).find((u) => u.username === username);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string = (
    await api
      .post('/api/login')
      .send({ ...user, password: 'secret' })
      .expect(200)
  ).body.token;

  return { ...user, token };
};

export const helper = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  initialUsers,
  usersInDb,
  loginUser,
};
