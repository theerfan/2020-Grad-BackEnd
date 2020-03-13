import * as Koa from 'koa';
import { middlewares } from './middlewares/middlewares';
import { ApolloServer } from 'apollo-server-koa';
// import { typeDefs } from './graphql/typedefs/query';
import { ImageResolver } from './graphql/resolvers/resolver';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema } from 'type-graphql';


const app = new Koa();

async function main() {
    const schema = await buildSchema({
        resolvers: [ImageResolver],
        authChecker,
        authMode: "null",

    })

    const server = new ApolloServer({
        schema,
        context: (ctx: Koa.Context) => ({
            ctx,
            req: ctx.request
        })
    });

    // The order is important, otherwise cors breaks it and the graphql server won't work!
    app.use(server.getMiddleware());
    app.use(middlewares());


    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );


}


export default app;


