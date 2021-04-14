import { NewNote } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isBoolean = (bool: unknown): bool is boolean => {
  return typeof bool === 'boolean';
};

const parseStringField = (param: unknown, fieldName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid ${fieldName}: ${param}`);
  }
  return param;
};

const parseBooleanOptionalField = (
  param: unknown,
  fieldName: string
): boolean | undefined => {
  if (!param) {
    return undefined;
  } else if (isBoolean(param)) {
    return param;
  } else {
    throw new Error(`Invalid ${fieldName}: ${param}`);
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
