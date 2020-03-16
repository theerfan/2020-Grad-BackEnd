import { prop as Property, getModelForClass, Ref, index } from '@typegoose/typegoose';
import { TarinCategory } from './tarinCategory.model';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";
import { AutUser } from './autUser.model';

@ObjectType()
@index({ category: 1, sender: 1, target: 1 }, { unique: true }) // Unique together
export class Vote {

    @Field(type => TarinCategory)
    @Property({ ref: "TarinCategory", required: true })
    public category!: Ref<TarinCategory>;

    @Field(type => AutUser)
    @Property({ ref: "AutUser", required: true })
    public caster!: Ref<AutUser>;

    @Field(type => AutUser)
    @Property({ ref: "AutUser", required: true })
    public target!: Ref<AutUser>;

}

export const VoteModel = getModelForClass(Vote, {
    existingConnection: db
});