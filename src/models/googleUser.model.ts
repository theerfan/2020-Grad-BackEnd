import { User } from "./user.model";
import {ObjectType, Field} from "type-graphql";
import {prop as Property} from '@typegoose/typegoose';

@ObjectType()
export class GoogleUser extends User
{
    @Field()
    @Property({trim: true, default: ""})
    public email!: string;
}