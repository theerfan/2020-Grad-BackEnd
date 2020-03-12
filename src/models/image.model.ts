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

// import * as mongoose from "mongoose";

// export interface Image extends mongoose.Document {
//     path: string;
//     alternateText: string;
//     hasThumbnail: boolean;
//   }

// const uri: string = "mongodb://127.0.0.1:27017/grad";

// mongoose.connect(uri, (err: any) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("Successfully Connected!");
//   }
// });


// export const imageSchema = new mongoose.Schema({
//   path: { type: String, required: true },
//   alternateText: { type: String, required: true },
//   hasThumbnail: { type: Boolean, required: true}
// });

// export const ImageModel = mongoose.model<Image>("Image", imageSchema);