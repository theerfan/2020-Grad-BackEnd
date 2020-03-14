import { prop as Property, Ref} from '@typegoose/typegoose';
import { Image } from './image.model';
import {ObjectType, Field} from "type-graphql";

@ObjectType()
export abstract class User {

    @Field()
    @Property({trim: true, default: ""})
    public firstName!: string;

    @Field()
    @Property({trim: true, default: ""})
    public lastName!: string;

    // @Field(type => [Vote])
    // @arrayProperty({ itemsRef: Vote, default: [] })
    // public votesCast!: Ref<Vote>[];

    @Field(type => Image!)
    @Property({ ref: "Image" })
    public profilePicture?: Ref<Image>;

}