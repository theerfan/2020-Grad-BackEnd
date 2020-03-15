import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Question, QuestionModel } from "src/models/question.model";

@Resolver()
export class QuestionResolver {
    @Query(returns => Question)
    async getAllQuestions(): Promise<Question[]> {
        return QuestionModel.find({});
    }

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
        throw Error ("Question not found");
    }

}