import { Langauge } from "./langauge";

export class Candidate {
    constructor(public Id:number,public Name:string,public BeginYear:number,public LastUpdateDate:Date,public allLanguages:string ){
    }
}
