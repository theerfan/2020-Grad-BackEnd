import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Vote, VoteModel } from "../../models/vote.model";
import { TarinCategoryModel } from "src/models/tarinCategory.model";
import { AutUserModel } from "src/models/autUser.model";

@Resolver()
export class VoteResolver {

    @Mutation(returns => Vote)
    async castVote(
        @Arg("category") title: string,
        @Arg("sender") senderStudentNumbeer: string,
        @Arg("target") targetStudentNumber: string
    ): Promise<Vote> {
        const category = await TarinCategoryModel.findOne({ title });
        const sender = await AutUserModel.findOne({ "studentNumber": senderStudentNumbeer });
        const target = await AutUserModel.findOne({ "studentNumber": targetStudentNumber });
        if (category && sender && target) {
            return await VoteModel.create({ category, sender, target });
        }
        throw Error("Something is not right!");
    }

    @Query(returns => Vote)
    async allVotesByUser(
        @Arg("user") studentNumber: string
    ): Promise<Vote[]> {
        const sender = await AutUserModel.findOne({ studentNumber });
        if (sender) {
            return await VoteModel.find({"sender": sender._id});
        }
        throw Error ("Sender doesn't exist.");
    }

    
}