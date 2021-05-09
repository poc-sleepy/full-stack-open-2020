import bcrypt from 'bcrypt';

import { NewUser } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (
  param: unknown,
  fieldName: string,
  minlength = 0
): string => {
  if (!param || !isString(param)) {
    const error = new Error(`Invalid ${fieldName}: ${param}`);
    error.name = 'ValidationError';
    throw error;
  } else if (param.length < minlength) {
    const error = new Error(
      `Invalid ${fieldName}: ${param} (${fieldName} needs ${minlength} characters at least.)`
    );
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
  const username = parseStringField(params.username, 'username', 3);
  const name = parseStringField(params.name, 'name');
  const password = parseStringField(params.password, 'password', 3);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const notes: string[] = [];
  const newUser: NewUser = { username, name, passwordHash, notes };
  return newUser;
};
