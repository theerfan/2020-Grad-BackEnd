import { prop, getModelForClass } from '@typegoose/typegoose';

export class TarinCategory {
    @prop()
    public title: string;
}

export const TarinCategoryModel = getModelForClass(TarinCategory);
