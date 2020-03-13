import { prop, getModelForClass } from '@typegoose/typegoose';
import { db } from '../database/connect';

export class TarinCategory {
    @prop()
    public title: string;
}

export const TarinCategoryModel = getModelForClass(TarinCategory, {
    existingConnection: db
});
