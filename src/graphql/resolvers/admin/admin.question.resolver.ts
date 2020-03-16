import { Resolver, Arg, Mutation } from "type-graphql";
import { Question, QuestionModel } from "../../../models/question.model";
import { AnswerModel } from "../../../models/answer.model";


@Resolver()
export class AdminQuestionResolver {
    @Mutation(returns => Question)
    async addQuestion(
        @Arg("phrase") phrase: string
    ): Promise<Question> {
        return QuestionModel.create({ phrase });
    }

    @Mutation(returns => Question)
    async editQuestion(
        @Arg("old") old: string,
        @Arg("new") newQ: string
    ): Promise<Question> {
        const oldQu = await QuestionModel.findOne({
            "phrase": old
        });
        if (oldQu) {
            oldQu.phrase = newQ;
            return await oldQu.save();
        }
        throw Error("Question not found");
    }

    async deleteQuestion(
        @Arg("question") phrase: string
    ): Promise<Question> {
        const question = await QuestionModel.findOneAndDelete({ phrase });
        if (question) {
            AnswerModel.deleteMany({
                "question": question._id
            });
            return question;
        }
        throw Error("question not found");
    }
}