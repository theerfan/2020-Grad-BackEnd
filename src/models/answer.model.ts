import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { trim } from '../constants/typeql';
import { Question } from './question.model';
import { db } from '../database/connect';
import {ObjectType, Field} from "type-graphql";

@ObjectType()
export class Answer {

    @Field()
    @Property(trim)
    public text!: string;

    @Field(type => Question)
    @Property({ ref: "Question", required: true })
    public question!: Ref<Question>;

    // public static async createOneOrUpdate(condition: any) {
    //     const AnswerModel = getModelForClass(Answer, {
    //         existingConnection: db
    //     });
        
        
    // }
}

export const AnswerModel = getModelForClass(Answer, {
    existingConnection: db
});
