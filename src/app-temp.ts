import * as Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';

const app = new Koa();

const typefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const solver = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({
  context: ({ ctx: { state: user } }) => ({
    user,
    models,
  }),
  typeDefs: typefs,
  
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, async () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));