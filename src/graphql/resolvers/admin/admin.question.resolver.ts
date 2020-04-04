import { Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { Question, QuestionModel } from "../../../models/question.model";
import { AnswerModel } from "../../../models/answer.model";
import { roles } from "../../../constants/typeql";


// export const resolveUser: MiddlewareFn = async({ context }, next) => {
//     console.log(context.ctx);
// };

@Resolver()
export class AdminQuestionResolver {

    // @UseMiddleware(resolveUser)
    @Authorized(roles.Admin)
    @Mutation(returns => Question)
    async addOrChangeQuestion(
        @Arg("phrase") phrase: string,
        @Arg("old") old: string,
    ): Promise<Question> {
        if (old) {
            const updated = await QuestionModel.findOneAndUpdate({ phrase: old }, { phrase });
            if (updated)
                return updated;
        }
        return await Question.findOneOrCreate(QuestionModel, { phrase });
    }

    @Authorized(roles.Admin)
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