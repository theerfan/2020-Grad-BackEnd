export async function findOneOrCreate(condition: any, doc: any) {
    const one = await this.findOne(condition);
    return one || await this.create(doc);
}