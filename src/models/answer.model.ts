import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { trim } from '../constants/trim';
import { Question } from './question.model';


export class Answer {

    @prop(trim)
    public text!: string;

    @prop({ ref: "Question" })
    public question: Ref<Question>;
}

export const AnswerModel = getModelForClass(Answer);