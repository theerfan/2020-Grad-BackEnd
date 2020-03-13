import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<any> = (
    { root, args, context, info },
    roles
) => {
    console.log(root);
    console.log(args);
    console.log(context);
    console.log(info);
    return true;
}