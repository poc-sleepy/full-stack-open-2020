import mongoose from 'mongoose';

import { logger } from './utils/logger';

if (process.argv.length < 3) {
  logger.info(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.pbagw.mongodb.net/note-app?retryWrites=true&w=majority`;

void mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
});

void note.save().then((_result) => {
  logger.info('note saved!');
  void mongoose.connection.close();
});

void Note.find({}).then((result) => {
  result.forEach((note) => {
    logger.info(note);
  });
  void mongoose.connection.close();
});
