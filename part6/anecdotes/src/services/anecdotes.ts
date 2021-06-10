import axios from 'axios';

import { Anecdote } from '../types';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get<Anecdote[]>(baseUrl);
  return response.data;
};

const create = async (content: string) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post<Anecdote>(baseUrl, anecdote);
  return response.data;
};

const update = async (id: string, anecdote: Anecdote) => {
  const response = await axios.put<Anecdote>(`${baseUrl}/${id}`, anecdote);
  return response.data;
};

export const anecdoteService = { getAll, create, update };
