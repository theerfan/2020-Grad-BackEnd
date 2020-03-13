import { prop as Property, getModelForClass, Ref, arrayProp as arrayProperty } from '@typegoose/typegoose';
import { trim } from '../constants/typeql';
import { User } from './user.model';
import { Image } from './image.model';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Comment {
    @Field()
    @Property(trim)
    public text!: string;

    @Field(type => User)
    @Property({ ref: "User" })
    public sender!: Ref<User>;

    @Field(type => User)
    @Property({ ref: "User" })
    public reciever!: Ref<User>;

    @Field(type => [Image]!)
    @arrayProperty({ ref: "Image" })
    public images?: Ref<Image>[];
}

export const CommentModel = getModelForClass(Comment, {
    existingConnection: db
});