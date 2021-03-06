import { Resolver, Mutation, Arg, ID, Ctx, Authorized } from 'type-graphql';
import { Comment, CommentModel } from '../../models/comment.model';
import { AutUserModel } from '../../models/autUser.model';
import { Schema } from 'mongoose';
import { Image, ImageModel } from '../../models/image.model';
import { Context } from 'koa';

@Resolver(of => Comment)
export class CommentResolver {

    @Authorized()
    @Mutation(returns => Comment)
    async addCommentForUser(
        @Arg("text") text: string,
        @Arg("receiverNumber") receiverNumber: string,
        @Arg("picturePaths", type => [String]) picturePaths: string[],
        @Ctx("ctx") ctx: Context
    ): Promise<Comment> {
        const receiver = await AutUserModel.findOne({ studentNumber: receiverNumber });
        const images = (await AutUserModel.find().where('path').in(picturePaths).select('_id').exec()).flat();
        return await CommentModel.create({
            text,
            sender: ctx.user,
            receiver,
            images
        });
    }

    @Mutation(returns => Comment)
    async deleteCommentForUser(
        @Arg("id", type => ID) id: Schema.Types.ObjectId
    ): Promise<Comment> {
        const comment = await CommentModel.findByIdAndDelete(id);
        if (comment?.images) {
            Image.findByMultipleIdsAndDeleteAndRemoveFiles(ImageModel, comment.images);
            return comment;
        }
        throw new Error("Comment not found asan!");
    }

}