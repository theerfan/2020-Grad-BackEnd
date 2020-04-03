import * as compose from 'koa-compose';
// import * as cors from 'koa-cors';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import { authorize } from './user-auth';
// import { authorize } from './user-auth';

// const options = {
//     origin: '*'
// }

export function middlewares() {
    return compose([
        logger(),
        // cors(options),
        bodyParser(),
        // authorize
    ]);
};

export function authorizeMiddleware() {
    return compose([
        authorize
    ]);
}