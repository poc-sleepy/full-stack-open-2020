export type Note = {
  id: number;
  content: string;
  date: string;
  important: boolean;
};

export type User = {
  id: string;
  username: string;
  name: string;
  passwordHash: string;
  notes: string[];
};
