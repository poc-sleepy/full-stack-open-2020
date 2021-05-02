import { listHelper } from '../utils/list_helper';
import { BlogType } from '../utils/types';

test('dummy returns one', () => {
  const blogs: BlogType[] = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
