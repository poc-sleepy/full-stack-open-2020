import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { config } from './config';
import { NewUser, UserToken } from './types';

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

  const blogs: string[] = [];
  const newUser: NewUser = { username, name, passwordHash, blogs };
  return newUser;
};

export const getLoginUser = async (token: string | undefined) => {
  if (config.SECRET === undefined) {
    throw new Error('Environment variable SECRET is not given.');
  }

  if (token === undefined) {
    const noTokenError = new Error('token missing or invalid');
    noTokenError.name = 'JsonWebTokenError';
    throw noTokenError;
  }

  const decodedTokenNever = jwt.verify(token, config.SECRET);
  if (typeof decodedTokenNever !== 'object') {
    const notObjectTokenError = new Error('token missing or invalid');
    notObjectTokenError.name = 'JsonWebTokenError';
    throw notObjectTokenError;
  }
  const decodedToken = decodedTokenNever as UserToken;

  if (decodedToken.id === undefined || decodedToken.id.length === 0) {
    const noIdTokenError = new Error('token missing or invalid');
    noIdTokenError.name = 'JsonWebTokenError';
    throw noIdTokenError;
  }

  const user = await User.findById(decodedToken.id);

  if (user === null) {
    const noIdTokenError = new Error('token missing or invalid');
    noIdTokenError.name = 'JsonWebTokenError';
    throw noIdTokenError;
  }

  return user;
};
