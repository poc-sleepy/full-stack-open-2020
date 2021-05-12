export type Note = {
  id: string;
  content: string;
  date: string;
  important: boolean;
};

export type NewNote = Omit<Note, 'id'>;

export type User = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  notes: string[];
};

export type UserToken = {
  id: string;
  username: string;
  name: string;
};
