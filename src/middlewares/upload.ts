import { Context, Next, Request } from 'koa';
// import { processRequest } from 'graphql-upload';

interface SuperRequest extends Request {
    files: any,
    file: any
}

export function uploader(format?: string) {

    return async function uploadWare(ctx: Context, next: Next) {
        if ('POST' !== ctx.method) return await next();
        if (ctx.request.type === 'multipart/form-data') {
            try {
                const superR = ctx.request as SuperRequest;
                const files = superR.files;
                const file = superR.file;
                console.log(files + "\n" + file);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        // const a = await processRequest(ctx.req, ctx.res);
        // console.log(a);
        return await next();
    }
}