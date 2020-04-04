import { Resolver, Query, Arg, ObjectType, Field, Authorized } from "type-graphql";
import { Vote, VoteModel } from "../../../models/vote.model";
import { AutUserModel } from "../../../models/autUser.model";
import { TarinCategoryModel } from "../../../models/tarinCategory.model";
import { roles } from "../../../constants/typeql";


@ObjectType()
export class TopVotedResult {
    @Field(type => Number)
    "numberOfVotes": number;
    @Field(type => Number)
    "overallPercentage": number;
    @Field()
    "fullName": string;
}


@Resolver()
export class AdminVoteResolver {
    @Authorized(roles.Admin)
    @Query(returns => Vote)
    async allVotesByUser(
        @Arg("user")
        studentNumber: string): Promise<Vote[]> {
        const sender = await AutUserModel.findOne({ studentNumber });
        if (sender) {
            return await VoteModel.find({ "sender": sender._id });
        }
        throw Error("Sender doesn't exist.");
    }
    
    @Authorized(roles.Admin)
    @Query(returns => [TopVotedResult])
    async topVotesOfCategory(
        @Arg("category")
        title: string,
        @Arg("limit")
        limit: number): Promise<TopVotedResult[]> {
        const category = await TarinCategoryModel.findOne({ title });
        if (category) {
            const votes = await VoteModel.find({ category }).populate("target");
            if (votes) {

                // const grouping = {
                //     "$group": {
                //         "_id": {
                //             "user": "$target"
                //         },
                //         "count": { "$sum": 1 },
                //     }
                // };
                // const finalize = [
                //     // { $lookup: { from: 'users', localField: '_id.user', foreignField: '_id', as: 'users' } },
                //     { $sort: { count: -1 } },
                //     { $limit: limit },
                //     { $project: { "count": 1, "users.firstname": 1, "users.lastname": 1, "users.autmail": 1 } }
                // ];
                const voteQuery = (await VoteModel.aggregate([
                    { "$match": { category: category._id } },
                    {
                        "$facet": {
                            "totalVotesForCategory": [{ "$count": "total" }],
                            "highestVotedForCategory": [
                                { $lookup: { from: 'autusers', localField: 'target', foreignField: '_id', as: 'users' } },
                                {
                                    "$group": {
                                        _id: { "user": "$target" },
                                        count: { "$sum": 1 },
                                    }
                                },
                                { $lookup: { from: 'autusers', localField: '_id.user', foreignField: '_id', as: 'users' } },
                                { $sort: { count: -1 } },
                                { $limit: limit },
                            ]
                        }
                    }
                ]))[0];

                const totalVotes = voteQuery["totalVotesForCategory"][0]["total"];
                const highestVoted = voteQuery["highestVotedForCategory"].map((t:any) => {
                    const currentUser = t.users[0];
                    return {
                        "numberOfVotes": t["count"],
                        "overallPercentage": t["count"] / totalVotes * 100,
                        "fullName": currentUser.firstname + " " + currentUser.lastname
                    }
                }) as TopVotedResult[];
                const a  = 12;
                console.log(a)
                return highestVoted;

            }
        }
        throw new Error("siktir");
    }
}