export type NoteType = {
  id: number;
  content: string;
  date: string;
  important: boolean;
};

export type NewNote = {
  content: string;
  important?: boolean;
};

export type UserType = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  notes: string[];
};

export type NewUser = {
  username: string;
  name: string;
  passwordHash: string;
  notes: string[];
};

export type UserToken = {
  id: string;
  username: string;
};
