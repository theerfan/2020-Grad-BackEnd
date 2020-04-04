import { prop as Property, getModelForClass, Ref, ReturnModelType } from '@typegoose/typegoose';
import { trim, nullable } from '../constants/typeql';
import { db } from '../database/connect';
import { ObjectType, Field } from "type-graphql";
import { unlink } from 'fs';

@ObjectType()
export class Image {

    @Field()
    @Property({ trim: true, unique: true, default: null })
    public path?: string;

    @Field(nullable)
    @Property(trim)
    public alternateText?: string;

    @Field(nullable)
    @Property({ default: false })
    public hasThumbnail: boolean;

    public static async findByIdAndDeleteAndRemoveFile(
        thisModel: ReturnModelType<typeof Image, unknown>,
        condition: Ref<Image>) {
        const one = await thisModel.findById(condition);
        if (one?.path) {
            unlink(one.path, () => { });
            await one.remove();
        }
    }
    public static async findByMultipleIdsAndDeleteAndRemoveFiles(
        thisModel: ReturnModelType<typeof Image, unknown>,
        conditions: Ref<Image>[]) {
        try {
            for (const cond of conditions) {
                await this.findByIdAndDeleteAndRemoveFile(thisModel, cond);
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
}

export const ImageModel = getModelForClass(Image, {
    existingConnection: db
});



