import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';
import { Next, Context } from 'koa';
import { AutUserModel } from '../models/autUser.model';

const jwtConfig = config.config.jwt;

function unallowedResponse(statusCode: number, message: string, auth?: boolean) {
    return {
        status: statusCode,
        json: { message, auth }
    };
}

export function authorize(ctx: Context, next: Next) {
    let token;
    try {
        // Trim out the bearer text using substring
        token = ctx.get('Authorization').substring(7);
        console.log(token);
    } catch (error) {
        return ctx.body = unallowedResponse(400, "No token provided");
    }

    if (!token) {
        return ctx.body = unallowedResponse(400, "No token provided");
    }
    jwt.verify(token, jwtConfig.secret, (err: Error, decoded: any) => {
        if (err)
            return ctx.body = unallowedResponse(401, "Failed to authenticate token.", false);
        AutUserModel.findById(decoded.id, (err2: any, usr: any) => {
            if (err2 || !usr) {
                return ctx.body = unallowedResponse(500, "Internal server problem.", false);
            }
            ctx.user = usr;
            return next();
        })
        return;
    });
    return;
}

