import { prop as Property, Ref, arrayProp as arrayProperty, getModelForClass } from '@typegoose/typegoose';
import { trim, nullable } from '../constants/typeql';
import { Vote } from './vote.model';
import { Answer } from './answer.model';
import { db } from '../database/connect';
import { User } from './user.model';
import { ObjectType, Field } from "type-graphql";import { AutUserCondDoc } from './interfaces/interfaces';

@ObjectType()
export class AutUser extends User {

    @Field()
    @Property({ unique: true, required: true, trim: true })
    public studentNumber!: string;

    @Field(nullable)
    @Property()
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
    public autMail!: string;

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
    @arrayProperty({ itemsRef: "Vote", default: []})
    public votesCast!: Ref<Vote>[];

    @Field(type => [Answer])
    @arrayProperty({ itemsRef: "Answer", default: [] })
    public answersGiven!: Ref<Answer>;

    // Typescript didn't accept the following line which strikes me as odd, keeping it here for further examination.
    // this: ReturnModelType<typeof AutUser>
    public static async findOneOrCreate(condition: AutUserCondDoc): Promise<AutUser> {
        const thisModel = getModelForClass(AutUser, {
            existingConnection: db
        })
        const one = await thisModel.findOne(condition);
        return one || await thisModel.create(condition);
    }
}

export const AutUserModel = getModelForClass(AutUser, {
    existingConnection: db
})
