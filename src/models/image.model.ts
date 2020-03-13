import { prop as Property , getModelForClass } from '@typegoose/typegoose';
import { trim, nullable } from '../constants/typeql';
import { db } from '../database/connect';
import {ObjectType, Field} from "type-graphql";

@ObjectType()
export class Image {

    @Field()
    @Property(trim)
    public path!: string;

    @Field(nullable)
    @Property(trim)
    public alternateText?: string;

    @Field(nullable)
    @Property({ default: false })
    public hasThumbnail: boolean;

}

export const ImageModel = getModelForClass(Image, {
    existingConnection: db
});



