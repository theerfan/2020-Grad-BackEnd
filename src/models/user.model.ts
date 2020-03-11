import {plugin, prop, Typegoose, staticMethod, instanceMethod} from 'typegoose';

const trim = {trim:true};

@plugin('mongoose-long')
class User extends Typegoose {

    @prop({unique: true, required: true, trim:true})
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

    @prop(trim)
    public GithubURL?: string;

    @prop(trim)
    public InstagramURL?: string;

    @prop(trim)
    public LinkedInURL?: string;

    @prop(trim)
    public TwitterURL?: string;

    @prop({unique: true, trim: true})
    public AutMail?: string;

    @prop(trim)
    public OtherMails: [string];

    // TODO: Separate Admin from user!
    @prop({default: false})
    public isAdmin?: boolean;

    @prop({default: false})
    public isGraduating?: boolean;

    @prop({default: false})
    public profileCompleted?: boolean;

    @prop(trim)
    public favoritePlace?: string;
}


export const UserModel = new User().getModelForClass(User);
