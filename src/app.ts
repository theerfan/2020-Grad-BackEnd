import * as Koa from 'koa';
import { middlewares } from './middlewares/middleware-compose';
import { ApolloServer } from 'apollo-server-koa';
import 'reflect-metadata';
// import { typeDefs } from './graphql/typedefs/query';
// import { ImageResolver } from './graphql/resolvers/sampleResolver';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema } from 'type-graphql';
// import { ImageUploadResolver } from './graphql/resolvers/upload.resolver';
// import { graphqlUploadKoa } from 'graphql-upload';
import { ImageResolver } from './graphql/resolvers/sample.resolver';
import { router } from './routers/multer';
import { AutUser } from './models/autUser.model';


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
        }),
        uploads: false,
        introspection: true
    });

    // The order is important, otherwise cors breaks it and the graphql server won't work!
    // app.use(graphqlUploadKoa({
    //     maxFileSize: 1000000,
    //     maxFiles: 10
    // }));
    app.use(middlewares());
    app.use(server.getMiddleware());
    app.use(router.routes());

    // await AutUserModel.deleteMany({}, () => {});
    const admin = await AutUser.findOneOrCreate({
        studentNumber: "9531815",
        autMail: "parsaenami"
    });
    if (admin) {
        console.log(admin.studentNumber);
    }
    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );


}

main();

export default app;


