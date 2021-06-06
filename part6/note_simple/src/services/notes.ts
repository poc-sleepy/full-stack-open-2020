import axios from 'axios';

import { Note } from '../types';

const baseUrl = 'http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get<Note[]>(baseUrl);
  return response.data;
};

export const noteService = { getAll };
