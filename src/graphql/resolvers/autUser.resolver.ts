import { Resolver, Mutation, Arg } from "type-graphql";
import { AutUser, AutUserModel } from "src/models/autUser.model";
import { AutOauthService } from "src/services/aut-oauth";
import { transfields } from '../../constants/tranfields';
import * as jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';
import * as configFile from '../../config/config';
import { LoginResponse } from '../interfaces/loginResponse.interface';

const jwtConfig = configFile.config.jwt;

@Resolver()
export class AutUserResolver {

    @Mutation()
    async AutLogin(
        @Arg("code") code: string
    ): Promise<LoginResponse> {
        const autOauth = new AutOauthService(Number(code));
        const autUserProfile = await autOauth.getUser();
        const stdNumber = String(autUserProfile.std_numbers[0]);
        const usr = await AutUser.findOneOrCreate(AutUserModel, { studentNumber: stdNumber, autMail: autUserProfile.email });
        if (usr) {
            let user = usr as DocumentType<AutUser>;
            if (stdNumber.startsWith('9531') || transfields.includes(stdNumber)) {
                user.isGraduating = true;
            }
            user = await user.save();
            const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
                expiresIn: jwtConfig.expirePeriod
            });
            return { _id: user._id, token };
        }
        return {};

    }
}