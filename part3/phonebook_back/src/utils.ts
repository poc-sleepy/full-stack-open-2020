import { NewPerson } from './types';

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (param: unknown, fieldName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid ${fieldName}: ${param}`);
  }
  return param;
};

type toNewPersonParams = { name: unknown; number: unknown };

export const toNewPerson = (params: toNewPersonParams): NewPerson => {
  const name = parseStringField(params.name, 'name');
  const number = parseStringField(params.number, 'number');
  return { name, number };
};
