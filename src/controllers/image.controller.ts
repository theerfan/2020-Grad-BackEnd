import { Image, ImageModel } from "../models/image.model";

export interface CreateImageInput {
    path: string
    alternateText: string
    hasThumbnail: boolean
}

export async function addImage({
    path,
    alternateText,
    hasThumbnail
}: CreateImageInput): Promise<Image | Error> {
    try {
        const data = await ImageModel.create({
            path,
            alternateText,
            hasThumbnail
        });
        return data;
    }
    catch (error) {
        throw error;
    }
}
