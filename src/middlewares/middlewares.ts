import * as compose from 'koa-compose';
import * as cors from 'koa-cors';
// import * as jwt from 'koa-jwt';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

const options = {
    origin: '*'
}

export function middlewares() {
    return compose([
        logger(),
        // cors(options),
        bodyParser(),
        // jwt({secret: "temp-secret"}).unless({path: [/^\/admin/]})
    ]);
};
