import axios from 'axios';
import { UserToken } from '../utils/types';

const baseUrl = '/api/login';

type Credentials = {
  username: string;
  password: string;
};

const login = async (credentials: Credentials) => {
  const response = await axios.post<UserToken>(baseUrl, credentials);
  return response.data;
};

export default { login };
