import { prop, getModelForClass } from '@typegoose/typegoose';
import { trim } from '../constants/trim';

export class Question {
    @prop(trim)
    public phrase: string;
}

export const QuestionModel = getModelForClass(Question);
