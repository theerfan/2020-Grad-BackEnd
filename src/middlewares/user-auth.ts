import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';
import { Context, Next } from 'koa';
import { AutUserModel } from '../models/autUser.model';
import { MiddlewareFn } from 'type-graphql';
const jwtConfig = config.config.jwt;

function unallowedResponse(statusCode: number, message: string, auth?: boolean) {
    return {
        status: statusCode,
        json: { message, auth }
    };
}

function noToken(ctx: Context) {
    ctx.body = unallowedResponse(400, "No token provided");
    return null;
}

export async function authorize(ctx: Context) { // Promise<DocumentType<AutUser> | null> {
    let token;
    try {
        // Trim out the bearer text using substring
        token = ctx.get('Authorization').substring(7);
    } catch (error) {
        return noToken(ctx);
    }

    if (!token) {
        return noToken(ctx);
    }
    const decoded = jwt.verify(token, jwtConfig.secret) as any;
    return ctx.state.user = await AutUserModel.findById(decoded.id);
}

export const graphAuthorize: MiddlewareFn = async ({ context }, next: Next) => {
    authorize(context as Context);
    await next();
};
