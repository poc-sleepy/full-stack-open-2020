import axios from 'axios';

import { BlogType } from '../utils/types';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get<BlogType[]>(baseUrl);
  return response.data;
};

export default { getAll };
