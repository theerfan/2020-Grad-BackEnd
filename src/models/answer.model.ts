import { prop as Property, getModelForClass, Ref, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { trim } from '../constants/typeql';
import { Question, QuestionModel } from './question.model';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Answer {

    @Field()
    @Property(trim)
    public text!: string;

    @Field(type => Question)
    @Property({ ref: "Question", required: true })
    public question!: Ref<Question>;

    public static async createOneOrUpdate(
        thisModel: ReturnModelType<typeof Answer, unknown>,
        question: Ref<Question>,
        text: string
    ): Promise<DocumentType<Answer>> {
        const ques = await QuestionModel.findById(question);
        const one = await thisModel.findOne({ question });
        if (one && ques) {
            one.text = text;
        }
        else if (ques) {
            return await thisModel.create({
                text,
                "question": ques
            });
        }
        throw Error ("something went wrong");
    }
}

export const AnswerModel = getModelForClass(Answer, {
    existingConnection: db
});
