import { AutUser } from "src/models/autUser.model";
import { Field, ObjectType } from "type-graphql";
import { TarinCategory } from "src/models/tarinCategory.model";

@ObjectType()
export class UserAndItsVotedCategories {
    @Field(type => AutUser)
    user: AutUser;

    @Field(type => [TarinCategory])
    votedCategories: TarinCategory[];
}