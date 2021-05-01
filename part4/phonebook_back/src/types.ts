export type PersonType = {
  id: number;
  name: string;
  number: string;
};

export type NewPerson = Omit<PersonType, 'id'>;
