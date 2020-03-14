import { IncomingForm, Fields, Files } from 'formidable';
import { Context, Next } from 'koa';

export async function uploadWare(ctx: Context, next: Next) {
    const form = new IncomingForm();
    form.multiples = true;
    await new Promise((resolve, reject) => {
        form.parse(ctx.req, (err: Error, fields: Fields, files: Files) => {
            if (err) {
                reject(err);
                return;
            }

            ctx.state = { fields, files };
            resolve();
        });
    });
    console.log(ctx);
    return await next();
}
