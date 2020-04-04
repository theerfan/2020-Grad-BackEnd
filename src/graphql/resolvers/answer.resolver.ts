import { Resolver, Mutation, Arg, Query, Ctx, Authorized } from "type-graphql";
import { Answer, AnswerModel } from "../../models/answer.model";
import { QuestionModel } from "../../models/question.model";
import { AutUserModel } from "../../models/autUser.model";
import { QuestionAnswer } from "../typeDefs/questionAnswer.typedef";
import { Context } from "koa";

@Resolver()
export class AnswerResolver {

    @Authorized()
    @Mutation(returns => Answer)
    async giveAnswer(
        @Arg("question") phrase: string,
        @Arg("answer") answerText: string,
        @Ctx("ctx") ctx: Context
    ): Promise<Answer> {
        const question = await QuestionModel.findOne({ phrase });
        if (question) {
            const answer = await Answer.createOneOrUpdate(AnswerModel, question._id, answerText);
            if (answer && ctx.user) {
                // Add answer to user's answers.
                AutUserModel.findByIdAndUpdate(ctx.user, { "$push": { "answersGiven": answer._id } });
                return answer;
            }
        }
        throw Error("question not found");
    }

    @Query(returns => QuestionAnswer)
    async allAnswersToQuestions(
        @Arg("user") studentNumber: string
    ): Promise<QuestionAnswer[]> {
        const list: QuestionAnswer[] = [];
        const user = await AutUserModel.findOne({ studentNumber });
        if (user?.answersGiven) {
            const castArray = user.answersGiven as any;
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < castArray.length; i++) {
                const answer = castArray[i].text;
                const question = castArray[i].question;
                const questionGiven = await QuestionModel.findOne({ question });
                if (questionGiven) {
                    list.push(
                        new QuestionAnswer(questionGiven.phrase, answer)
                    )
                }
            }
            return list;
        }
        throw Error("something went wrong!");
        // return new QuestionAnswer();
    }
}
