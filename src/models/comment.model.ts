import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { trim } from '../constants/trim';
import { User } from './user.model';
import { Image } from './image.model';


class Comment {
    @prop(trim)
    public text!: string;

    @prop({ ref: "User" })
    public sender!: Ref<User>;

    @prop({ ref: "User" })
    public reciever!: Ref<User>;

    @arrayProp({ ref: "Image" })
    public images: Ref<Image>[];
}

export const CommentModel = getModelForClass(Comment);