import { Resolver, Query } from "type-graphql";
import { Question, QuestionModel } from "src/models/question.model";

@Resolver()
export class QuestionResolver {
    @Query(returns => Question)
    async getAllQuestions(): Promise<Question[]> {
        return QuestionModel.find({});
    }

}