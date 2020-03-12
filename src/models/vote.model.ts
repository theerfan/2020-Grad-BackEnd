import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { TarinCategory } from './tarinCategory.model';

export class Vote {

    @prop({ ref: "TarinCategory" })
    public category: Ref<TarinCategory>;

    @prop({ ref: "User" })
    public target: Ref<User>;

}

export const VoteModel = getModelForClass(Vote);