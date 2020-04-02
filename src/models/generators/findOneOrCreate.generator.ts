import { ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor, DocumentType } from "@typegoose/typegoose/lib/types";

export function findOneOrCreateGenerator<T, V>() {
    return async (thisModel: ReturnModelType<AnyParamConstructor<T>, {}>, condition: V): Promise<DocumentType<T>> => {
        const one = await thisModel.findOne(condition);
        return one || await thisModel.create(condition);
    };
};
