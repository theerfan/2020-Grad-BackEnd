import * as Koa from 'koa';
import { middlewares } from './middlewares/middleware-compose';
import { ApolloServer } from 'apollo-server-koa';
import 'reflect-metadata';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema } from 'type-graphql';
import { ImageResolver } from './graphql/resolvers/sample.resolver';
import { router } from './routers/multer';
import { AutUser, AutUserModel } from './models/autUser.model';
import { CommentResolver } from './graphql/resolvers/comment.resolver';
// import { db } from './database/connect';
import { AutUserResolver } from './graphql/resolvers/autUser.resolver';
import { AnswerResolver } from './graphql/resolvers/answer.resolver';


const app = new Koa();

async function main() {
    const schema = await buildSchema({
        resolvers: [ImageResolver, CommentResolver, AutUserResolver, AnswerResolver],
        authChecker,
        authMode: "null",
    })

    const server = new ApolloServer({
        schema,
        context: ctx => ctx,
        uploads: false,
        introspection: true
    });
    app.use(middlewares());
    app.use(server.getMiddleware());
    app.use(router.routes());

    // await db.dropDatabase();
    const admin = await AutUser.findOneOrCreate(AutUserModel, {
        studentNumber: "9531815",
        autMail: "parsaenami"
    });

    const commenter = await AutUser.findOneOrCreate(AutUserModel, {
        studentNumber: "9531012",
        autMail: "ashkan"
    });
    if (admin) {
        console.log(admin.studentNumber);
        console.log(commenter);
    }
    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );


}

main();

export default app;


