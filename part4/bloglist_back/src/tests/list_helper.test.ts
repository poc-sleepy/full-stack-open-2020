import { listHelper } from '../utils/list_helper';

test('dummy returns one', () => {
  const blogs: any[] = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
