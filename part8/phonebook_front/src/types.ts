type Address = {
  street: string;
  city: string;
};

export type Person = {
  name: string;
  phone?: string;
  address: Address;
  id: string;
};

export type queryResultData = {
  allPersons: Person[];
  findPerson: Person | null;
};
