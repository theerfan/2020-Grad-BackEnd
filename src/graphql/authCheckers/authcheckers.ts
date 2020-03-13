import { AuthChecker } from "type-graphql";
import { Context } from './context.interface';

export const authChecker: AuthChecker<Context> = (
    { root, args, context, info },
    roles
) => {
    console.log(root);
    console.log(args);
    console.log(context);
    console.log(info);
    return true;
}