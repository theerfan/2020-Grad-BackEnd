import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { Vote, VoteModel } from "../../models/vote.model";
import { TarinCategoryModel } from "../../models/tarinCategory.model";
import { AutUserModel } from "../../models/autUser.model";
import { Context } from "koa";

@Resolver()
export class VoteResolver {

    @Mutation(returns => Vote)
    async castVote(
        @Arg("category") title: string,
        @Arg("target") targetStudentNumber: string,
        @Ctx("ctx") ctx: Context
    ): Promise<Vote> {
        const category = await TarinCategoryModel.findOne({ title });
        const caster = await AutUserModel.findOne({ "studentNumber": ctx.user });
        const target = await AutUserModel.findOne({ "studentNumber": targetStudentNumber });
        if (category && caster && target) {
            if (target.isGraduating)
                return await VoteModel.create({ category, caster, target });
            else
                throw Error("User isn't graduating");
        }
        throw Error("Something is not right!");
    }

    

}