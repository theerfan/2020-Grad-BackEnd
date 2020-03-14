import { prop as Property, getModelForClass, Ref } from '@typegoose/typegoose';
import { trim, nullable } from '../constants/typeql';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";
import { unlink } from 'fs';

@ObjectType()
export class Image {

    @Field()
    @Property({ trim: true, unique: true })
    public path!: string;

    @Field(nullable)
    @Property(trim)
    public alternateText?: string;

    @Field(nullable)
    @Property({ default: false })
    public hasThumbnail: boolean;

    public static async findByIdAndDeleteAndRemoveFile(condition: Ref<Image>) {
        const thisModel = getModelForClass(Image, {
            existingConnection: db
        });
        const one = await thisModel.findById(condition);
        if (one) {
            unlink(one.path, () => { });
            await one.remove();
        }
    }
}

export const ImageModel = getModelForClass(Image, {
    existingConnection: db
});



