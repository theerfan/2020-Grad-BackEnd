import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Admin {
    @Field()
    @Property({ trim: true, unique: true, required: true })
    public username!: string;

    @Field()
    @Property({ required: true })
    public password!: string;
}

export const AdminModel = getModelForClass(Admin, {
    existingConnection: db
});
