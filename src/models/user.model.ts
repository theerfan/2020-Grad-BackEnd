import { prop, Ref, arrayProp } from '@typegoose/typegoose';
import { Vote } from './vote.model';
import { trim } from '../constants/trim';
import { Image } from './image.model';


export abstract class User {

    @prop(trim)
    public firstName?: string;

    @prop(trim)
    public lastName?: string;

    @prop({trim: true, default: ""})
    public primaryEmail!: string;

    @arrayProp({ itemsRef: Vote, default: [] })
    public votesCast!: Ref<Vote>[];

    @prop({ ref: "Image" })
    public profilePicture?: Ref<Image>;

}