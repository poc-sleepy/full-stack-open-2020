import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

export const config = {
  MONGODB_URI,
  PORT,
  SECRET,
};
