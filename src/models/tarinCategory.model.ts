import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TarinCategory {
    @Field()
    @Property()
    public title: string;
}

export const TarinCategoryModel = getModelForClass(TarinCategory, {
    existingConnection: db
});
