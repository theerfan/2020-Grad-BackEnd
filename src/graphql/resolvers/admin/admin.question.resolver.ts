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
    async addQuestion(
        @Arg("phrase") phrase: string
    ): Promise<Question> {
        console.log("made it here");
        const q = await Question.findOneOrCreate(QuestionModel, { phrase });
        console.log("def here");
        if (q) {
            console.log("also here");
            console.log(q);
            return q;
        }
        console.log("waywhat")
        throw Error ("wtf");
    }

    @Authorized(roles.Admin)
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