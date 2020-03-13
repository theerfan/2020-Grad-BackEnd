import { prop, getModelForClass } from '@typegoose/typegoose';
import { trim, nullableTrim } from '../constants/trim';
import { db } from '../database/connect';
import {ObjectType, Field, Authorized} from "type-graphql";

@ObjectType()
export class Image {

    @Authorized()
    @Field()
    @prop(trim)
    public path!: string;

    @Field({nullable: true})
    @prop(nullableTrim)
    public alternateText?: string;

    @Field({nullable: true})
    @prop({ default: false })
    public hasThumbnail: boolean;

}

export const ImageModel = getModelForClass(Image, {
    existingConnection: db
});



