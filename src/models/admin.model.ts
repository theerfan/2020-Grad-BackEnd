import { prop, getModelForClass } from '@typegoose/typegoose';
import { db } from '../database/connect';

class Admin {
    @prop()
    public username: string;

    @prop()
    public password: string;
}

export const AdminModel = getModelForClass(Admin, {
    existingConnection: db
});
