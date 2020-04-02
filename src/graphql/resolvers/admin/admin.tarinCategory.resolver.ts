import { Resolver, Arg, Mutation } from "type-graphql";
import { TarinCategoryModel, TarinCategory } from "../../../models/tarinCategory.model";

@Resolver()
export class AdminTarinCategoryResolver {
    @Mutation(returns => TarinCategory)
    async addTarinCategory(
        @Arg("title")
        title: string
        ): Promise<TarinCategory> {
        return await TarinCategoryModel.create({ title });
    }
}
