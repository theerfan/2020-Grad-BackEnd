import { prop, getModelForClass } from '@typegoose/typegoose';
import { trim } from '../constants/trim';
import { db } from '../database/connect';

export class Image {

    @prop(trim)
    public path!: string;

    @prop(trim)
    public alternateText?: string;

    @prop({ default: false })
    public hasThumbnail: boolean;

}

export const ImageModel = getModelForClass(Image, {
    existingConnection: db
});



