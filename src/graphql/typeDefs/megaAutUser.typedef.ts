import { AutUser } from "src/models/autUser.model";
import { Field, ObjectType } from "type-graphql";
import { TarinCategory } from "src/models/tarinCategory.model";
import { Comment } from "src/models/comment.model";
import { QuestionAnswer } from "./questionAnswer.typedef";

@ObjectType()
export class MegaAutUser {
    @Field(type => AutUser)
    user: AutUser;

    @Field(type => [TarinCategory])
    votedCategories: TarinCategory[];

    @Field(type => [Comment])
    commentsForUser: Comment[];

    @Field(type => [QuestionAnswer])
    answersToQuestions: QuestionAnswer[];
}