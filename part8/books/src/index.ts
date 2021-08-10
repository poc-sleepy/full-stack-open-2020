import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import { v1 as uuid } from 'uuid';

import { AuthorWithBookCount, Resolvers } from './generated/graphql';
import { initAuthors, initBooks } from './data';

let authors = initAuthors;
let books = initBooks;

const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf8' });

const resolvers: Resolvers = {
  Query: {
    bookCount: () => {
      return books.length;
    },
    authorCount: () => {
      return authors.length;
    },
    allBooks: (_root, args) => {
      let rtnbooks = books;

      if (args.author !== undefined && args.author !== null) {
        const author = args.author;
        rtnbooks = books.filter((book) => book.author === author);
      }
      if (args.genre !== undefined && args.genre !== null) {
        // NOTE: genreをstring型にfixさせないとinclude()で怒られる
        const genre = args.genre;
        rtnbooks = rtnbooks.filter((book) => book.genres.includes(genre));
      }
      return rtnbooks;
    },
    allAuthors: () => {
      return authors.map((author) => {
        const bookCount = books.filter(
          (book) => book.author === author.name
        ).length;
        return { ...author, bookCount } as AuthorWithBookCount;
      });
    },
  },
  Mutation: {
    addBook: (_root, args) => {
      const book = {
        ...args,
        id: uuid(),
      };
      books = books.concat(book);

      if (
        authors.filter((author) => author.name === args.author).length === 0
      ) {
        const author = {
          id: uuid(),
          name: args.author,
        };
        authors = authors.concat(author);
      }

      return book;
    },
    editAuthor: (_root, args) => {
      const targetAuthor = authors.find((author) => author.name === args.name);
      if (targetAuthor === undefined) return null;

      const updatedAuthor = targetAuthor;

      // NOTE: nullでのborn更新を許容するため、スキーマ上では!をつけない
      if (args.setBornTo !== undefined) {
        updatedAuthor.born = args.setBornTo;
      }

      authors = authors.map((author) =>
        author.id === updatedAuthor.id ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
