import { prop, getModelForClass, Ref, arrayProp } from '@typegoose/typegoose';
import { trim } from '../constants/trim';
import { Image } from './image.model';
import { Vote } from './vote.model';
import { Answer } from './answer.model';

export class User {

    @prop({ unique: true, required: true, trim: true })
    public studentName!: string;

    @prop(trim)
    public firstName?: string;

    @prop(trim)
    public lastName?: string;

    @prop(trim)
    public gender?: string;

    @prop(trim)
    public birthday?: Date;

    @prop(trim)
    public birthPlace?: string;

    @prop(trim)
    public phone?: string;

    @prop(trim)
    public bio?: string;

    @prop(trim)
    public quote?: string;

    @prop({ ref: "Image" })
    public profilePicture?: Ref<Image>;

    @prop(trim)
    public GithubURL?: string;

    @prop(trim)
    public InstagramURL?: string;

    @prop(trim)
    public LinkedInURL?: string;

    @prop(trim)
    public TwitterURL?: string;

    @prop({ unique: true, trim: true })
    public AutMail?: string;

    @arrayProp({ items: String })
    public OtherMails?: string[];

    @prop({ default: false })
    public isGraduating?: boolean;

    @prop({ default: false })
    public profileCompleted?: boolean;

    @prop(trim)
    public favoritePlace?: string;

    @arrayProp({ itemsRef: Vote, default: [] })
    public votesCast!: Ref<Vote>[];

    @arrayProp({ itemsRef: "Answer", default: [] })
    public answersGiven!: Ref<Answer>;

}


export const UserModel = getModelForClass(User);

// const UserSchema = buildSchema(User);
// UserSchema.static('findOneOrCreate', async function findOneOrCreate(this: any, conditions: any, doc: any) {
//     const one = await this.findOne(conditions)
//     return one || await this.create(doc);
// });

// export const UserModel = addModelToTypegoose(mongoose.model('User', UserSchema), User);
