import { prop as Property, Ref, arrayProp as arrayProperty, buildSchema, addModelToTypegoose } from '@typegoose/typegoose';
import { trim, nullable } from '../constants/typeql';
import { Vote } from './vote.model';
import { Answer } from './answer.model';
import { db } from '../database/connect';
import { User } from './user.model';
import { findOneOrCreate } from './helperFunctions/findoneorcreate';
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AutUser extends User {

    @Field()
    @Property({ unique: true, required: true, trim: true })
    public studentNumber!: string;

    @Field(nullable)
    @Property(trim)
    public birthday?: Date;

    @Field(nullable)
    @Property(trim)
    public birthPlace?: string;

    @Field(nullable)
    @Property(trim)
    public phone?: string;

    @Field(nullable)
    @Property(trim)
    public bio?: string;

    @Field(nullable)
    @Property(trim)
    public quote?: string;

    @Field(nullable)
    @Property(trim)
    public GithubURL?: string;

    @Field(nullable)
    @Property(trim)
    public InstagramURL?: string;

    @Field(nullable)
    @Property(trim)
    public LinkedInURL?: string;

    @Field(nullable)
    @Property(trim)
    public TwitterURL?: string;

    @Field()
    @Property({ unique: true, trim: true, required: true })
    public AutMail!: string;

    @Field()
    @Property({ default: false })
    public isGraduating?: boolean;

    // @Field()
    // @Property({ default: false })
    // public profileCompleted?: boolean;

    // @Field()
    // @Property(trim)
    // public favoritePlace?: string;

    @Field()
    @Property({ required: true, default: false })
    public isAdmin!: boolean;

    @Field(type => [Vote])
    @arrayProperty({ itemsRef: Vote, default: [], required: true })
    public votesCast!: Ref<Vote>[];

    @Field(type => [Answer])
    @arrayProperty({ itemsRef: "Answer", default: [], required: true })
    public answersGiven!: Ref<Answer>;

}

const AutUserSchema = buildSchema(AutUser);
AutUserSchema.static('findOneOrCreate', findOneOrCreate);

export const AutUserModel = addModelToTypegoose(db.model('AutUser', AutUserSchema), AutUser);