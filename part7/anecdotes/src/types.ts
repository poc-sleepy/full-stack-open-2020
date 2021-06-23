export type AnecdoteType = {
  content: string;
  author: string;
  info: string;
  votes: number;
  id: string;
};

export type NewAnecdoteType = Omit<AnecdoteType, 'id'>;
