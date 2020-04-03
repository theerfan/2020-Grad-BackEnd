import { Resolver, Arg, Mutation, Authorized } from "type-graphql";
import { TarinCategoryModel, TarinCategory } from "../../../models/tarinCategory.model";

@Resolver()
export class AdminTarinCategoryResolver {
    @Authorized()
    @Mutation(returns => TarinCategory)
    async addTarinCategory(
        @Arg("title")
        title: string
        ): Promise<TarinCategory> {
        return await TarinCategoryModel.create({ title });
    }
}
