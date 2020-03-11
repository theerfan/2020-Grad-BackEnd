import * as Koa from 'koa';
import { middlewares } from './middlewares/middlewares';
import { ApolloServer } from 'apollo-server-koa';
import { typeDefs } from './graphql/typedefs/query';
import { resolvers } from './graphql/resolvers/resolver';

const app = new Koa();

app.use(middlewares());

const server = new ApolloServer({ typeDefs, resolvers });

app.use(server.getMiddleware());

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);


 export default app;

