import axios from 'axios';

import { BlogType, NewBlogType, UpdatingBlogType } from '../utils/types';
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

const update = async (params: UpdatingBlogType) => {
  const response = await axios.put<BlogType>(`${baseUrl}/${params.id}`, params);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete<null>(`${baseUrl}/${id}`, config);
  return;
};

export default { setToken, getAll, create, update, remove };
