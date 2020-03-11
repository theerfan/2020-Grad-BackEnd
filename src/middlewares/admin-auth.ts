import * as passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import * as configFile from '../config/config';
import * as Koa from 'koa';

const config = configFile.config;

const opts: StrategyOptions = {

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // normally store the following in process.env.secret
    secretOrKey: config.jwt.secret
};


passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    if (jwtPayload.isGraduating === true) {
        return done(null, { isGraduating: true })
    } else if (jwtPayload._id)
        return done(null, jwtPayload);
    return done(null, false)
}));

export const authenticationRequired = passport.authenticate('jwt', { session: false });
export const alumniAuthenticationRequired = (req: any, res: any, next: any) => {
    if (req.user.isAdmin === true)
        next();
    else
        res.status(403).json({ error: 'Not permitted' })
};

export const adminBasicAuth = (ctx: Koa.Context, next: Koa.Next) => {
    const req = ctx.request;
    const authHeader = req.headers['authorization'];
    if (authHeader == null) {
        ctx.throw(401, "No authorization header provided");
    }
    const digests = authHeader.split(' ');
    if (digests.length !== 2) {
        ctx.throw(401, "No appropriate authorization digest provided");
    }
    const buff = new Buffer(digests[1], 'base64');
    const authValue = buff.toString('ascii').split(':');
    const username = authValue[0];
    const password = authValue[1];
    const adminConfig = config.adminBasicAuthConfig;
    if (username === adminConfig.username && password === adminConfig.password)
        return next();
    else
        ctx.throw(401, "No appropriate authorization digest provided");
};