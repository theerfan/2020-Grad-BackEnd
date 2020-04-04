import { Resolver, Query, Arg, Authorized } from "type-graphql";
import { Vote, VoteModel } from "../../../models/vote.model";
import { AutUserModel } from "../../../models/autUser.model";
import { TarinCategoryModel, TarinCategory } from "../../../models/tarinCategory.model";
import { roles } from "../../../constants/typeql";
import { TopVotedResult } from '../../typeDefs/topVotedResult.typedef';
import { DocumentType } from '@typegoose/typegoose';

export async function topOfSingleCategory(limit: Number, checked?: boolean, title?: string, ref?: DocumentType<TarinCategory>) {
    let category;
    if (checked)
        category = ref;
    else
        category = await TarinCategoryModel.findOne({ title });
    if (category) {
        const votes = await VoteModel.find({ category }).populate("target");
        if (votes) {
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
            const highestVoted = voteQuery["highestVotedForCategory"].map((t: any) => {
                const currentUser = t.users[0];
                return new TopVotedResult(
                    t['count'],
                    t['count'] / totalVotes * 100,
                    currentUser.firstname + " " + currentUser.lastname);
                // return {
                //     "numberOfVotes": t["count"],
                //     "overallPercentage": t["count"] / totalVotes * 100,
                //     "fullName": currentUser.firstname + " " + currentUser.lastname
                // }
            }) as TopVotedResult[];
            return highestVoted;
        }
    }
    throw new Error("siktir");
}


@Resolver()
export class AdminVoteResolver {
    @Authorized(roles.Admin)
    @Query(returns => Vote)
    async allVotesByUser(
        @Arg("user") studentNumber: string
    ): Promise<Vote[]> {
        const sender = await AutUserModel.findOne({ studentNumber });
        if (sender) {
            return await VoteModel.find({ "sender": sender._id });
        }
        throw Error("Sender doesn't exist.");
    }

    @Authorized(roles.Admin)
    @Query(returns => [TopVotedResult])
    async topVotesOfCategory(
        @Arg("category") title: string,
        @Arg("limit") limit: number
    ): Promise<TopVotedResult[]> {
        return topOfSingleCategory(title, limit);
    }

    @Authorized(roles.Admin)
    @Query(returns => [[TopVotedResult]])
    async topVotesOfAllCategories(
        @Arg("limit") limit: number
    ): Promise<TopVotedResult[][]> {
        const results: TopVotedResult[][] = [];
        const allCategories = await TarinCategoryModel.collection.find();
        allCategories.forEach(async (record) => {
            const res = await topOfSingleCategory(limit, true, undefined, record);
            results.push(res);
        });
        return results;
    }
}


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