import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password> | node mongo.js <password> <name> <number>'
  );
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.pbagw.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

void mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

export default interface PersonDocument extends mongoose.Document {
  name: string,
  number: string
}

const Person = mongoose.model<PersonDocument>('Person', personSchema);

const getPeople = () => {
  console.log('phonebook:');
  void Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    void mongoose.connection.close();
  });
};

const savePerson = (name: string, number: string) => {
  const person = new Person({ name, number });
  void person.save().then((_result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    void mongoose.connection.close();
  });
};

if (process.argv.length == 3) {
  void getPeople();
} else if (process.argv.length == 5) {
  const name = process.argv[3];
  const number = process.argv[4];
  void savePerson(name, number);
} else {
  console.log(
    'Please provide the password as an argument: node mongo.js <password> | node mongo.js <password> <name> <number>'
  );
  process.exit(1);
}
