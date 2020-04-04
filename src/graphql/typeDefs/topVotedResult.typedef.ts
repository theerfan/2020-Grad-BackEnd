import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class TopVotedResult {
    @Field(type => Number)
    public numberOfVotes: number;
    @Field(type => Number)
    public overallPercentage: number;
    @Field()
    public fullName: string;

    constructor(numberOfVotes: number, overallPercentage: number, fullName: string) {
        this.numberOfVotes = numberOfVotes;
        this.overallPercentage = overallPercentage;
        this.fullName = fullName;
    }
}