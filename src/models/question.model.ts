import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from "type-graphql";


@ObjectType()
export class Question {
    @Field()
    @Property({trim: true, unique: true})
    public phrase!: string;
}

export const QuestionModel = getModelForClass(Question);
