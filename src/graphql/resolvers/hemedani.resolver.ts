import { Resolver, Mutation, Arg } from 'type-graphql';
import { GraphQLUpload, FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class UploadResolver {
    @Mutation(_ => Promise<Boolean>)
    async singleUpload(@Arg('file', () => GraphQLUpload) file: FileUpload) {
        const { createReadStream, filename } = await file;
        const writableStream = createWriteStream(
            `${__dirname}/../../../files/images/${filename}`,
            { autoClose: true }
        );
        return new Promise((res, rej) => {
            createReadStream()
                .pipe(writableStream)
                .on("finish", () => res(true))
                .on("error", () => rej(false));
        });
    }
}