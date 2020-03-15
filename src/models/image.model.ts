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

    private static model = getModelForClass(Image, {
        existingConnection: db
    });

    public static async findByIdAndDeleteAndRemoveFile(condition: Ref<Image>) {
        const one = await this.model.findById(condition);
        if (one) {
            unlink(one.path, () => { });
            await one.remove();
        }
    }
    public static async findByMultipleIdsAndDeleteAndRemoveFiles(conditions: Ref<Image>[]) {
        try {
            for (const cond of conditions) {
                await this.findByIdAndDeleteAndRemoveFile(cond);
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



