import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import { AuthorWithBookCount, Resolvers } from './generated/graphql';
import { authors, books } from './data';

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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

void server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
