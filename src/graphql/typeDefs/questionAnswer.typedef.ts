import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class QuestionAnswer {
    @Field()
    public question: string;

    @Field()
    public answer: string;

    constructor(question: string, answer: string)
    {
        this.question = question;
        this.answer = answer;
    }
}