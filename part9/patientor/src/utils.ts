import { NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid name: ${param}`);
  }
  return param;
};

const parseDateOfBirth = (param: unknown): string => {
  if (!param || !isString(param) || isNaN(Date.parse(param))) {
    throw new Error(`Invalid dateOfBirth: ${param}`);
  }
  return param;
};

const parseSsn = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid ssn: ${param}`);
  }
  return param;
};

const parseGender = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid gender: ${param}`);
  }
  return param;
};

const parseOccupation = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error(`Invalid occupation: ${param}`);
  }
  return param;
};

type toNewPatientField = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};

const toNewPatient = (params: toNewPatientField): NewPatient => {
  return {
    name: parseName(params.name),
    dateOfBirth: parseDateOfBirth(params.dateOfBirth),
    ssn: parseSsn(params.ssn),
    gender: parseGender(params.gender),
    occupation: parseOccupation(params.occupation),
  };
};

export { toNewPatient };
