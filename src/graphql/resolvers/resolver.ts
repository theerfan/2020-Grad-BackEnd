import {books} from '../testdata/books';
import {addImage, CreateImageInput} from '../../controllers/image.controller';

export const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    addImage: (_: null, {input}: {input: CreateImageInput}) =>
      addImage({...input}),
  },
};