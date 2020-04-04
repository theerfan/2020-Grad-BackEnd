import { prop as Property, Ref} from '@typegoose/typegoose';
import { Image } from './image.model';
import {ObjectType, Field} from "type-graphql";

@ObjectType()
export abstract class User {

    @Field(type => String!)
    @Property({trim: true, default: ""})
    public firstName!: string;

    @Field(type => String!)
    @Property({trim: true, default: ""})
    public lastName!: string;

    // @Field(type => [Vote])
    // @arrayProperty({ itemsRef: Vote, default: [] })
    // public votesCast!: Ref<Vote>[];

    @Field(type => Image, {nullable: true})
    @Property({ ref: "Image"})
    public profilePicture?: Ref<Image>;


}