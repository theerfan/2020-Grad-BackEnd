import { prop, Ref, arrayProp } from '@typegoose/typegoose';
import { Vote } from './vote.model';
import { trim } from '../constants/trim';


export abstract class User {

    @prop(trim)
    public firstName?: string;

    @prop(trim)
    public lastName?: string;

    @prop({trim: true, default: ""})
    public primaryEmail!: string;

    @arrayProp({ itemsRef: Vote, default: [] })
    public votesCast!: Ref<Vote>[];

}