import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { trim } from '../constants/typeql';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Question {
    @Field()
    @Property(trim)
    public phrase!: string;
}

export const QuestionModel = getModelForClass(Question);
