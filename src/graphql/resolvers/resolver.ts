import {books} from "../testdata/books";

export const resolvers = {
  Query: {
    books: () => books,
  },
};