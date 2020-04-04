import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { AutUser, AutUserModel } from "../../models/autUser.model";
// import { AutOauthService } from "src/services/aut-oauth";
import { transfields } from '../../constants/tranfields';
import * as jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import * as configFile from '../../config/config';
import { Context } from "koa";
// import { TarinCategory } from "src/models/tarinCategory.model";
// import { UserAndItsVotedCategories } from "../typeDefs/userAndItsVotedCategories.typedef";

const jwtConfig = configFile.config.jwt;

@Resolver()
export class AutUserResolver {

    @Mutation(returns => AutUser)
    async AutLogin(
        @Arg("code") code: string,
        @Ctx("ctx") ctx: Context
    ): Promise<AutUser> {
        // const autOauth = new AutOauthService(Number(code));
        // const autUserProfile = await autOauth.getUser();
        // const studentNumber = String(autUserProfile.std_numbers[0]);
        const studentNumber = "9631001";
        const autUserProfile = {
            email: "mamad@gmail.com"
        }
        const usr = await AutUser.findOneOrCreate(AutUserModel, { studentNumber, autMail: autUserProfile.email });
        if (usr) {
            let user = usr as DocumentType<AutUser>;
            if (studentNumber.startsWith('9531') || transfields.includes(studentNumber)) {
                user.isGraduating = true;
            }
            user = await user.save();
            const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
                expiresIn: jwtConfig.expirePeriod
            });
            ctx.res.setHeader('Authorization', `Bearer ${token}`);
            return usr;
        }
        throw Error ("Problem with aut login");

    }

    // Needs Authorization!
    // @Mutation(returns => AutUser)
    // async editProfile(): Promise<AutUser> {}

    @Query(returns => [AutUser], {nullable: true})
    async getAllGraduating(): Promise<AutUser[]>
    {
        return [];
        // const a = await AutUserModel.find({
        //     isGraduating: true
        // });

        // console.log(a)
        // return a;
    }

    @Query(returns => AutUser)
    async getSingleUser(
        @Arg("studentNumber") studentNumber: string
    ): Promise<AutUser> {
        const user = await AutUserModel.findOne({studentNumber});
        if (user?.isGraduating)
            return user;
        throw Error ("Unfelan user");
    }

    // @Query(returns => UserAndItsVotedCategories)
    // async getVotedCategoriesForUser(
    //     @Arg("studentNumber") studentNumber: string
    // ): Promise<UserAndItsVotedCategories> {
    //     const user = await AutUserModel.findOne({studentNumber});
    //     AutUserModel.aggregate
    //     if (user?.isGraduating)
    //         return user;
    //     throw Error ("Unfelan user");
    // }
}