import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Answer, AnswerModel } from "../../models/answer.model";
import { QuestionModel } from "../../models/question.model";
import { AutUserModel } from "../../models/autUser.model";
import { QuestionAnswer } from "../typeDefs/questionAnswer";

@Resolver()
export class AnswerResolver {

    @Mutation(returns => Answer)
    async giveAnswer(
        @Arg("studentNumber") studentNumber: string,
        @Arg("question") phrase: string,
        @Arg("answer") answerText: string
    ): Promise<Answer> {
        const question = await QuestionModel.findOne({ phrase });
        if (question) {
            const answer = await Answer.createOneOrUpdate(AnswerModel, question._id, answerText);
            if (answer)
                return answer;
        }
        throw Error("question not found");
    }

    @Query(returns => QuestionAnswer)
    async allAnswersToQuestions(
        @Arg("user") studentNumber: string
    ): Promise<QuestionAnswer[]> {
        const list: QuestionAnswer[] = [];
        const user = await AutUserModel.findOne({ studentNumber });
        if (user) {
            if (user.answersGiven) {
                const castArray = user.answersGiven as any;
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < castArray.length; i++) {
                    const answer = castArray[i].text;
                    const question = castArray[i].question;
                    const questionGiven = await QuestionModel.findOne({ question });
                    if (questionGiven) {
                        list.push(
                            new QuestionAnswer(questionGiven.phrase, answer);
                        )
                    }
                }
                return list;
            }
        }
        throw Error ("something went wrong!");
        // return new QuestionAnswer();
    }
}
