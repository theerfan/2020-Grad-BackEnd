import { prop, getModelForClass} from '@typegoose/typegoose';
import {trim} from '../constants/trim';

export class Image {

    @prop(trim)
    public imagePath!: string;

    @prop(trim)
    public alternateText?: string;

    @prop({default: false})
    public hasThumbnail: boolean;

}

export const ImageModel = getModelForClass(Image);