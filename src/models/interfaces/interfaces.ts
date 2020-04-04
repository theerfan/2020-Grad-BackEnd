import { TarinCategory } from "../tarinCategory.model";
import { Ref } from '@typegoose/typegoose';
import { AutUser } from "../autUser.model";

export interface AutUserCond {
    studentNumber?: string,
    autMail?: string
}

export interface TarinCategoryCond {
    title?: string
}

export interface QuestionCond {
    phrase?: string
}

export interface VoteCond {
    category?: Ref<TarinCategory>,
    caster?: Ref<AutUser>,
    target?: Ref<AutUser>
}

export interface CommentCond {
    a: string;
}