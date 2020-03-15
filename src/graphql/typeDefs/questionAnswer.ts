import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class QuestionAnswer {
    @Field()
    public question: string;

    @Field()
    public answer: string;

    constructor(q: string, a: string)
    {
        this.question = q;
        this.answer = a;
    }
}