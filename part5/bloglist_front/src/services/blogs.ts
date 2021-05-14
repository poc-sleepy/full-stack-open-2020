import axios from 'axios';

import { BlogType, NewBlogType } from '../utils/types';
const baseUrl = '/api/blogs';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get<BlogType[]>(baseUrl);
  return response.data;
};

const create = async (params: NewBlogType) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post<BlogType>(baseUrl, params, config);
  return response.data;
};

export default { setToken, getAll, create };
