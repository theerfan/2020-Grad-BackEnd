import { prop, getModelForClass } from '@typegoose/typegoose';

class Admin {
    @prop()
    public username: string;

    @prop()
    public password: string;
}

export const AdminModel = getModelForClass(Admin);
