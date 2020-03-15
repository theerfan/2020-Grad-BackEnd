import { prop as Property, getModelForClass, Ref, arrayProp as arrayProperty } from '@typegoose/typegoose';
import { trim } from '../constants/typeql';
import { User } from './user.model';
import { Image } from './image.model';
import { db } from '../database/connect';
import { ObjectType, Field, ID } from "type-graphql";
import { Schema } from 'mongoose';

@ObjectType()
export class Comment {

    @Field(type => ID)
    // @Property()
    readonly _id: Schema.Types.ObjectId;

    @Field()
    @Property(trim)
    public text!: string;

    @Field(type => User)
    @Property({ ref: "User" })
    public sender!: Ref<User>;

    @Field(type => User)
    @Property({ ref: "User" })
    public receiver!: Ref<User>;

    @Field(type => [Image]!)
    @arrayProperty({ ref: "Image" })
    public images?: Ref<Image>[];

    // public static async removeAndPurge(condition: )
}

export const CommentModel = getModelForClass(Comment, {
    existingConnection: db
});