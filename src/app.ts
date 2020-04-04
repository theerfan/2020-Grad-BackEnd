import 'reflect-metadata';
import * as Koa from 'koa';
import { middlewares } from './middlewares/middleware-compose';
import { ApolloServer } from 'apollo-server-koa';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema, } from 'type-graphql';
import { ImageResolver } from './graphql/resolvers/sample.resolver';
import { router as multer } from './routers/multer';
import { CommentResolver } from './graphql/resolvers/comment.resolver';
import { AnswerResolver } from './graphql/resolvers/answer.resolver';
// import { printSchema } from 'graphql';
// import * as fs from 'fs';
import { AdminQuestionResolver } from './graphql/resolvers/admin/admin.question.resolver';
import { AdminTarinCategoryResolver } from "./graphql/resolvers/admin/admin.tarinCategory.resolver";
import { AdminVoteResolver } from "./graphql/resolvers/admin/admin.vote.resolver";
import { VoteResolver } from './graphql/resolvers/vote.resolver';
// import { db } from './database/connect';
import { AutUserDummyResolver } from './graphql/resolvers/dummy/autUser.dummy.resolver.';
import { graphAuthorize } from './middlewares/user-auth';
// import { AutUser, AutUserModel } from './models/autUser.model';

const app = new Koa();

async function main() {
    const schema = await buildSchema({
        resolvers: [ImageResolver, CommentResolver, AutUserDummyResolver, AnswerResolver, AdminQuestionResolver, AdminTarinCategoryResolver, AdminVoteResolver, VoteResolver],
        globalMiddlewares: [graphAuthorize],
        authChecker
    })

    const server = new ApolloServer({
        schema,
        context: ctx => ctx,
        uploads: false,
        introspection: true,

    });
    app.use(middlewares());
    app.use(server.getMiddleware());
    app.use(multer.routes());
    app.use(multer.allowedMethods());

    // await db.dropDatabase();
    // const admin = await AutUser.findOneOrCreate(AutUserModel, {
    //     studentNumber: "9531815",
    //     autMail: "parsaenami"
    // });
    // admin.isGraduating = true;
    // admin.isAdmin = true;
    // admin.save();


    // const commenter = await AutUser.findOneOrCreate(AutUserModel, {
    //     studentNumber: "9531012",
    //     autMail: "ashkan",
    // });

    // commenter.isGraduating = true;
    // commenter.save();

    // if (admin) {
    //     console.log(admin.studentNumber);
    //     console.log(commenter);
    // }
    // console.log((await db).modelNames());
    // fs.writeFileSync("schema.gql", printSchema(schema));
    // console.log(printSchema(schema));

    app.listen({ port: 7000 }, () =>
        console.log(`Server ready at http://localhost:7000${server.graphqlPath}`),
    );
}

main();

export default app;


