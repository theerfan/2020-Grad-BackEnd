import * as Koa from 'koa';
// import { middlewares } from './middlewares/middlewares';
import { ApolloServer } from 'apollo-server-koa';
import { typeDefs } from './graphql/typedefs/query';
import { resolvers } from './graphql/resolvers/resolver';
// import { db } from './database/connect';

const app = new Koa();

const server = new ApolloServer({ typeDefs, resolvers });

// The order is important, otherwise cors breaks it and the graphql server won't work!
app.use(server.getMiddleware());
// app.use(middlewares());
// app.use(async ctx => {
//   await db;
// });

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
);



export default app;

