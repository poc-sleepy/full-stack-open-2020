/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params: any) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

const error = (...params: any) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params);
  }
};

export const logger = { info, error };
