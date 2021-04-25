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
