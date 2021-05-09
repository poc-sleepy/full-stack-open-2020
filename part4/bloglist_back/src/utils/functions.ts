import bcrypt from 'bcrypt';

import { NewUser } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (param: unknown, fieldName: string): string => {
  if (!param || !isString(param)) {
    const error = new Error(`Invalid ${fieldName}: ${param}`);
    error.name = 'ValidationError';
    throw error;
  }
  return param;
};

type toNewUserParams = {
  username: unknown;
  name: unknown;
  password: unknown;
};

export const toNewUser = async (params: toNewUserParams): Promise<NewUser> => {
  const username = parseStringField(params.username, 'username');
  const name = parseStringField(params.name, 'name');
  const password = parseStringField(params.password, 'password');

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const notes: string[] = [];
  const newUser: NewUser = { username, name, passwordHash, notes };
  return newUser;
};
