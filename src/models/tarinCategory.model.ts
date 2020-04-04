import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";
import { findOneOrCreateGenerator } from './generators/generators';
import { TarinCategoryCond } from './interfaces/interfaces';

@ObjectType()
export class TarinCategory {
    @Field()
    @Property({ trim: true, unique: true })
    public title!: string;

    public static findOneOrCreate = findOneOrCreateGenerator<TarinCategory, TarinCategoryCond>();
}


export const TarinCategoryModel = getModelForClass(TarinCategory, {
    existingConnection: db
});
