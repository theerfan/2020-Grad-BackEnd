import { Image, ImageModel } from "../models/image.model";

export interface CreateImageInput {
    path: string
    alternateText: string
    hasThumbnail: boolean
}

export async function createNewImage({
    path,
    alternateText,
    hasThumbnail
}: CreateImageInput): Promise<Image | undefined> {
    try {
        const data = await ImageModel.create({
            path,
            alternateText,
            hasThumbnail
        });
        return data;
    }
    catch (error) {
        return;
        // return new Promise(Image)
        // throw error;
    }
}
