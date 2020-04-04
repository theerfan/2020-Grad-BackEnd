import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectType, Field } from "type-graphql";
import { db } from '../database/connect';
import { findOneOrCreateGenerator } from './generators/generators';
import { QuestionCond } from './interfaces/interfaces';


@ObjectType()
export class Question {
    @Field()
    @Property({ trim: true, unique: true })
    public phrase!: string;

    public static findOneOrCreate = findOneOrCreateGenerator<Question, QuestionCond>();
}

export const QuestionModel = getModelForClass(Question, {
    existingConnection: db
});
