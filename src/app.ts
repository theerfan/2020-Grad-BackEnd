import * as Koa from 'koa';
import { middlewares } from './middlewares/middlewares';
import { ApolloServer } from 'apollo-server-koa';
import 'reflect-metadata';
// import { typeDefs } from './graphql/typedefs/query';
// import { ImageResolver } from './graphql/resolvers/sampleResolver';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema } from 'type-graphql';
import { ImageUploadResolver } from './graphql/resolvers/upload.resolver';
import { graphqlUploadKoa } from 'graphql-upload';


const app = new Koa();

async function main() {
    const schema = await buildSchema({
        resolvers: [ImageUploadResolver],
        authChecker,
        authMode: "null",
    })

    const server = new ApolloServer({
        schema,
        context: (ctx: Koa.Context) => ({
            ctx,
            req: ctx.request
        }),
        uploads: false,
        introspection: true
    });

    // The order is important, otherwise cors breaks it and the graphql server won't work!
    app.use(graphqlUploadKoa({
        maxFileSize: 1000000,
        maxFiles: 10
    }));
    app.use(server.getMiddleware());
    app.use(middlewares());


    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );


}

main();

export default app;


