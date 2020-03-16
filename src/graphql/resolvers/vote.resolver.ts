import { Resolver, Arg, Mutation } from "type-graphql";
import { Vote, VoteModel } from "../../models/vote.model";
import { TarinCategoryModel } from "../../models/tarinCategory.model";
import { AutUserModel } from "../../models/autUser.model";

@Resolver()
export class VoteResolver {

    @Mutation(returns => Vote)
    async castVote(
        @Arg("category") title: string,
        @Arg("caster") casterStudentNumbeer: string,
        @Arg("target") targetStudentNumber: string
    ): Promise<Vote> {
        const category = await TarinCategoryModel.findOne({ title });
        const caster = await AutUserModel.findOne({ "studentNumber": casterStudentNumbeer });
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