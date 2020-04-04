import { Resolver, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import { Vote, VoteModel } from "../../models/vote.model";
import { TarinCategoryModel } from "../../models/tarinCategory.model";
import { AutUserModel } from "../../models/autUser.model";
import { Context } from "koa";

@Resolver()
export class VoteResolver {

    @Authorized()
    @Mutation(returns => Vote)
    async castVote(
        @Arg("category") title: string,
        @Arg("target") studentNumber: string,
        @Ctx("ctx") ctx: Context
    ): Promise<Vote> {
        const category = (await TarinCategoryModel.findOne({ title }))?.id;
        const caster = ctx.user;
        const target = (await AutUserModel.findOne({ studentNumber }))?.id;
        if (category && caster && target) {
            if (target.isGraduating)
                return await Vote.findOneOrCreate(VoteModel, { category, caster, target });
            else
                throw Error("User isn't graduating");
        }
        throw Error("Something is not right!");
    }

}