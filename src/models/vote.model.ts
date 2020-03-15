import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import { TarinCategory } from './tarinCategory.model';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Vote {

    @Field(type => TarinCategory)
    @Property({ ref: "TarinCategory", required: true })
    public category!: Ref<TarinCategory>;

    @Field(type => User)
    @Property({ ref: "User", required: true })
    public sender!: Ref<User>;

    @Field(type => User)
    @Property({ ref: "User", required: true })
    public target!: Ref<User>;

}

export const VoteModel = getModelForClass(Vote, {
    existingConnection: db
});