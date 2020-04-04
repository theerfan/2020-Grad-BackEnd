import { AuthChecker } from "type-graphql";
// import { Context } from 'koa';
// import { authorize } from "../../middlewares/user-auth";
// import { roles } from "../../constants/typeql";


export const authChecker: AuthChecker<any> = async (
    // { root, args, context, info },
    { context },
    currentQueryRoles
) => {

    return true;
    // if (currentQueryRoles.length === 0)
    //     return true;

    // // This is done because the middleware won't actually go before the authChecker, weird, huh?
    // const user = await authorize(context.ctx);
    // if (currentQueryRoles.includes(roles.Admin))
    //     if (user)
    //         return user?.isAdmin;
    // if (user)
    //     return true;
    
    // return false;
}