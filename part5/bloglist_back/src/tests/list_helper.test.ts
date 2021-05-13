import { listHelper } from '../utils/list_helper';
import {
  BlogType,
  FavoriteBlog,
  MostBlogsAuthor,
  MostLikesAuthor,
} from '../utils/types';
import { helper, MongoBlogType } from './test_helper';

const listWithOneBlog: BlogType[] = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const listWithSomeBlog: BlogType[] = helper.initialBlogs.map(
  (mongoBlog: MongoBlogType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = mongoBlog;
    const blog: BlogType = {
      id: _id.toString(),
      ...rest,
    };
    return blog;
  }
);

const listWithSomeBlog2: BlogType[] = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Michael Chan',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const listWithSomeBlog3: BlogType[] = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 24,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
];

// ***************************************************
// ***************************************************

test('dummy returns one', () => {
  const blogs: BlogType[] = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

// ***************************************************
// ***************************************************

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has some blog, equals the total of their likes', () => {
    const result = listHelper.totalLikes(listWithSomeBlog);
    expect(result).toBe(36);
  });

  test('when list has no blog, equals zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

// ***************************************************
// ***************************************************

describe('favorite blog', () => {
  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const expected: FavoriteBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog, equals the blog which has most likes', () => {
    const result = listHelper.favoriteBlog(listWithSomeBlog);
    const expected: FavoriteBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog which some blogs has most likes, equals earlier index blog of them', () => {
    const result = listHelper.favoriteBlog(listWithSomeBlog2);
    const expected: FavoriteBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };
    expect(result).toEqual(expected);
  });

  test('when list has no blog, equals null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(undefined);
  });
});

// ***************************************************
// ***************************************************

describe('most blogs', () => {
  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    const expected: MostBlogsAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog, equals the author which has most blog', () => {
    const result = listHelper.mostBlogs(listWithSomeBlog);
    const expected: MostBlogsAuthor = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog which some author has blogs, equals earlier index author of them', () => {
    const result = listHelper.mostBlogs(listWithSomeBlog2);
    const expected: MostBlogsAuthor = {
      author: 'Michael Chan',
      blogs: 2,
    };
    expect(result).toEqual(expected);
  });

  test('when list has no blog, equals null', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(undefined);
  });
});

// ***************************************************
// ***************************************************

describe('most likes', () => {
  test('when list has only one blog, equals that author', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    const expected: MostLikesAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog, equals the author which has most likes', () => {
    const result = listHelper.mostLikes(listWithSomeBlog);
    const expected: MostLikesAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    expect(result).toEqual(expected);
  });

  test('when list has some blog which some author has blogs, equals earlier index author of them', () => {
    const result = listHelper.mostLikes(listWithSomeBlog3);
    const expected: MostLikesAuthor = {
      author: 'Michael Chan',
      likes: 24,
    };
    expect(result).toEqual(expected);
  });

  test('when list has no blog, equals null', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(undefined);
  });
});
