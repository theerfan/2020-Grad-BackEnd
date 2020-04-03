import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';
import { Context } from 'koa';
import { AutUserModel, AutUser } from '../models/autUser.model';
import { DocumentType } from '@typegoose/typegoose';
import { resolve } from 'dns';

const jwtConfig = config.config.jwt;

function unallowedResponse(statusCode: number, message: string, auth?: boolean) {
    return {
        status: statusCode,
        json: { message, auth }
    };
}

export async function authorize(ctx: Context): Promise<DocumentType<AutUser> | null> {
    let token;
    try {
        // Trim out the bearer text using substring
        token = ctx.get('Authorization').substring(7);
    } catch (error) {
        ctx.body = unallowedResponse(400, "No token provided");
    }

    if (!token) {
        ctx.body = unallowedResponse(400, "No token provided");
        return null;
    }

    const decoded = jwt.verify(token, jwtConfig.secret) as any;
    console.log(decoded);
    return await AutUserModel.findById(decoded.id);

}

