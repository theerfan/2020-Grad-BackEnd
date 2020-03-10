import compose from 'koa-compose';
import cors from 'koa-cors';
import jwt from 'koa-jwt';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';


export default () => {
    return compose(
        logger(),
        cors(),
        bodyParser(),

    )
};