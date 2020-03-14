
import { Resolver, Mutation, Ctx } from "type-graphql";
import { Context } from "koa";
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from "os";
import { Image, ImageModel } from "src/models/image.model";
import {GraphQLUpload} from 'graphql-upload';


@Resolver()
export class ImageUploadResolver {

    @Mutation(returns => Image)
    async uploadCommentImages(
        @Args("file")
    ): Promise<Image[]> {
        const images: Image[] = [];
        for (const file of ctx.state.files)
        {
            const reader = fs.createReadStream(file.path);
            const filePath = path.join(tmpdir(), Math.random().toString());
            const stream = fs.createWriteStream(filePath);
            reader.pipe(stream);
            await new Promise(fullfill => stream.on('close', fullfill));
            console.log('uploaded %s =? %s', file.filename, stream.path);
            const newImage = await ImageModel.create(filePath);
            images.push(newImage);
        }
        return images;
    }

}
