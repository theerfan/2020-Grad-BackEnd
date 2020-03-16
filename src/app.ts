import 'reflect-metadata';
import * as Koa from 'koa';
import { middlewares } from './middlewares/middleware-compose';
import { ApolloServer } from 'apollo-server-koa';
import { authChecker } from './graphql/authCheckers/authcheckers';
import { buildSchema } from 'type-graphql';
import { ImageResolver } from './graphql/resolvers/sample.resolver';
import { router } from './routers/multer';
import { AutUser, AutUserModel } from './models/autUser.model';
import { CommentResolver } from './graphql/resolvers/comment.resolver';
import { AutUserResolver } from './graphql/resolvers/autUser.resolver';
import { AnswerResolver } from './graphql/resolvers/answer.resolver';
import { printSchema } from 'graphql';
import * as fs from 'fs';
import { AdminQuestionResolver } from './graphql/resolvers/admin/admin.question.resolver';
import { AdminTarinCategoryResolver } from "./graphql/resolvers/admin/Admin.tarinCategory.resolver";
import { AdminVoteResolver } from "./graphql/resolvers/admin/admin.vote.resolver";
import { VoteResolver } from './graphql/resolvers/vote.resolver';
import { db } from './database/connect';


const app = new Koa();

async function main() {
    const schema = await buildSchema({
        resolvers: [ImageResolver, CommentResolver, AutUserResolver, AnswerResolver, AdminQuestionResolver, AdminTarinCategoryResolver, AdminVoteResolver, VoteResolver],
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
    admin.isGraduating = true;
    admin.isAdmin = true;
    admin.save();
    

    const commenter = await AutUser.findOneOrCreate(AutUserModel, {
        studentNumber: "9531012",
        autMail: "ashkan",
    });

    commenter.isGraduating = true;
    commenter.save();

    if (admin) {
        console.log(admin.studentNumber);
        console.log(commenter);
    }
    console.log((await db).modelNames());
    fs.writeFileSync("schema.gql", printSchema(schema));
    // console.log(printSchema(schema));

    app.listen({ port: 7000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`),
    );


}

main();

export default app;


