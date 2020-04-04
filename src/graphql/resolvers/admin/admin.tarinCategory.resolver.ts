import { Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { TarinCategoryModel, TarinCategory } from "../../../models/tarinCategory.model";
import { roles } from "../../../constants/typeql";

@Resolver()
export class AdminTarinCategoryResolver {
    @Authorized(roles.Admin)
    @Mutation(returns => TarinCategory)
    async addTarinCategory(
        @Arg("title")
        title: string
    ): Promise<TarinCategory> {
        return await TarinCategory.findOneOrCreate(TarinCategoryModel, { title });
    }
}
