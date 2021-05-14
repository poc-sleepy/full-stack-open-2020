import axios from 'axios';

import { UserTokenType } from '../utils/types';

const baseUrl = '/api/login';

type Credentials = {
  username: string;
  password: string;
};

const login = async (credentials: Credentials) => {
  const response = await axios.post<UserTokenType>(baseUrl, credentials);
  return response.data;
};

export default { login };
