import * as Koa from 'koa';
import { middlewares } from './middlewares/middlewares';
import { ApolloServer, gql } from 'apollo-server-koa';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const app = new Koa();

app.use(middlewares());

const server = new ApolloServer({ typeDefs, resolvers });

app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);


export default app;