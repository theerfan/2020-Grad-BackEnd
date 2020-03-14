
import { Resolver, Mutation, Ctx } from "type-graphql";
import { Context } from "koa";
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from "os";


@Resolver()
export class ImageUploadResolver {

    @Mutation(returns => String)
    async uploadCommentImages(
        @Ctx() ctx: Context
    ): Promise<string> {
        for (const file of ctx.files)
        {
            const reader = fs.createReadStream(file.path);
            const stream = fs.createWriteStream(path.join(tmpdir(), Math.random().toString()));
            reader.pipe(stream);
            console.log('uploading %s =? %s', file.filename, stream.path)
        }
        return "";
    }

}
