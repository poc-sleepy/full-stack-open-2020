import bcrypt from 'bcrypt';

import { NewNote, NewUser } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean';
};

const parseStringField = (param: unknown, fieldName: string): string => {
  if (!param || !isString(param)) {
    const error = new Error(`Invalid ${fieldName}: ${param}`);
    error.name = 'InvalidValueError';
    throw error;
  }
  return param;
};

const parseBooleanOptionalField = (
  param: unknown,
  fieldName: string
): boolean | undefined => {
  if (param === undefined) {
    return undefined;
  } else if (isBoolean(param)) {
    return param;
  } else {
    const error = new Error(`Invalid ${fieldName}: ${param}`);
    error.name = 'InvalidValueError';
    throw error;
  }
};

type toNewNoteParams = {
  content: unknown;
  important: unknown;
};

export const toNewNote = (params: toNewNoteParams): NewNote => {
  const content = parseStringField(params.content, 'content');
  const important = parseBooleanOptionalField(params.important, 'important');
  const newNote: NewNote = { content };
  if (important !== undefined) {
    newNote['important'] = important;
  }
  return newNote;
};

export const toUpdateNote = (params: toNewNoteParams): NewNote => {
  return toNewNote(params);
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
