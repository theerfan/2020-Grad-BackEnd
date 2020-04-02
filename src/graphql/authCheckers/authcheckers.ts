import { AuthChecker } from "type-graphql";
import * as jwt from 'jsonwebtoken';
import * as config from '../../config/config';
import { Context } from 'koa';
import { AutUserModel } from '../../models/autUser.model';

const jwtConfig = config.config.jwt;

function unallowedResponse(statusCode: number, message: string, auth?: boolean) {
    return {
        status: statusCode,
        json: { message, auth }
    };
}


export const authChecker: AuthChecker<Context> = (
    { root, args, context, info },
    roles
) => {
    let token;
    try {
        // Trim out the bearer text using substring
        token = context.get('Authorization').substring(7);
        console.log(token);
    } catch (error) {
        context.body = unallowedResponse(400, "No token provided");
        return false;
    }

    if (!token) {
        context.body = unallowedResponse(400, "No token provided");
        return false;
    }
    jwt.verify(token, jwtConfig.secret, (err: Error, decoded: any) => {
        if (err) {
            context.body = unallowedResponse(401, "Failed to authenticate token.");
            return false;
        }
        AutUserModel.findById(decoded.id, (err2: Error, usr: any) => {
            if (err2 || !usr) {
                context.body = unallowedResponse(500, "Internal server problem.", false);
                return false;
            }
            context.user = usr;
            return true;
        })
        return false;
    });
    return false;
}