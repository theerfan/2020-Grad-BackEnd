import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { AutUser, AutUserModel } from "../../../models/autUser.model";
// import { AutOauthService } from "src/services/aut-oauth";
import { transfields } from '../../../constants/tranfields';
import * as jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import * as configFile from '../../../config/config';
import { Context } from "koa";

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
            ctx.set('authentication', token);
            return usr;
        }
        throw Error("Problem with aut login");

    }

    // Needs Authorization!
    // @Mutation(returns => AutUser)
    // async editProfile(): Promise<AutUser> {}


    @Query(returns => AutUser)
    async getAllGraduating(): Promise<AutUser[]> {
        return await AutUserModel.find({
            isGraduating: true
        });
    }

    @Query(returns => AutUser)
    async getSingleUser(
        @Arg("studentNumber") studentNumber: string
    ): Promise<AutUser> {
        const user = await AutUserModel.findOne({ studentNumber });
        if (user?.isGraduating)
            return user;
        throw Error("Unfelan user");
    }
}