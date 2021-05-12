import axios from 'axios';
import { NewNote, Note } from '../utils/types';
const baseUrl = '/api/notes';

const getAll = async () => {
  const response = await axios.get<Note[]>(baseUrl);
  // FIXME: 本当はここで型バリデーションが必要
  return response.data;
};

const create = async (newObject: NewNote) => {
  const response = await axios.post<Note>(baseUrl, newObject);
  // FIXME: 本当はここで型バリデーションが必要
  return response.data;
};

const update = async (id: string, newObject: NewNote) => {
  const response = await axios.put<Note>(`${baseUrl}/${id}`, newObject);
  // FIXME: 本当はここで型バリデーションが必要
  return response.data;
};

export default {
  getAll,
  create,
  update,
};
