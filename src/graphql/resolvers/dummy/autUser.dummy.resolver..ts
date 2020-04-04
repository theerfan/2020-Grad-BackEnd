import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { AutUser, AutUserModel } from "../../../models/autUser.model";
// import { AutOauthService } from "src/services/aut-oauth";
import { transfields } from '../../../constants/tranfields';
import * as jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import * as configFile from '../../../config/config';
import { Context } from "koa";
import { MegaAutUser } from "../../typeDefs/megaAutUser.typedef";
import { QuestionAnswer } from "../../typeDefs/questionAnswer.typedef";
import { QuestionModel } from "../../../models/question.model";
import { CommentModel } from "../../../models/comment.model";
import { VoteModel, Vote } from "src/models/vote.model";
import { TarinCategoryModel, TarinCategory } from "src/models/tarinCategory.model";

const jwtConfig = configFile.config.jwt;

@Resolver()
export class AutUserDummyResolver {

    @Mutation(returns => AutUser)
    async AutLogin(
        @Arg("studentNumber") studentNumber: string,
        @Arg("autEmail") autMail: string,
        @Ctx("ctx") ctx: Context
    ): Promise<AutUser> {
        const usr = await AutUser.findOneOrCreate(AutUserModel, { studentNumber, autMail });
        if (usr) {
            let user = usr as DocumentType<AutUser>;
            if (studentNumber.startsWith('9531') || transfields.includes(studentNumber)) {
                user.isGraduating = true;
            }
            user = await user.save();
            const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
                expiresIn: jwtConfig.expirePeriod
            });
            console.log(user._id);
            ctx.res.setHeader('Authorization', `Bearer ${token}`);
            return usr;
        }
        throw Error("Problem with aut login");
    }

    // Needs Authorization!
    // @Mutation(returns => AutUser)
    // async editProfile(): Promise<AutUser> {}


    @Query(returns => [AutUser])
    async getAllGraduating(): Promise<AutUser[]> {
        return await AutUserModel.find({
            isGraduating: true
        });
    }

    @Query(returns => AutUser)
    async getSingleUser(
        @Arg("studentNumber") studentNumber: string
    ): Promise<MegaAutUser> {
        const qaList: QuestionAnswer[] = [];
        const user = await AutUserModel.findOne({ studentNumber });
        if (user?.isGraduating) {
            const commentList = await CommentModel.find({ receiver: user._id });
            if (user.answersGiven) {
                const castArray = user.answersGiven as any;
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < castArray.length; i++) {
                    const answer = castArray[i].text;
                    const question = castArray[i].question;
                    const questionGiven = await QuestionModel.findOne({ question });
                    if (questionGiven) {
                        qaList.push(
                            new QuestionAnswer(questionGiven.phrase, answer)
                        )
                    }
                }
            }

            const categoryList = await VoteModel.aggregate([
                { $match: { target: user._id } },
                { $lookup: { from: TarinCategoryModel.collection.name, localField: 'category', foreignField: '_id', as: 'category' } },
                { $group: { _id: { "user": "$target" }, count: {"$sum": 1 } } },
                { $replaceRoot: { newRoot: "$category" } },
            ]).exec() as TarinCategory[];

            return new MegaAutUser(user, categoryList, commentList, qaList);

        }
        throw Error("Unfelan user");
    }
}