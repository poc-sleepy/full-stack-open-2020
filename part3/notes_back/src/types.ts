export type Note = {
  id: number;
  content: string;
  date: string;
  important: boolean;
};

export type NewNote = {
  content: string;
  important?: boolean;
};
