import { User } from "./user";

export class Cv{
    constructor(
        public user:User,
        public studies:[{
                            establishment:string,
                            section:string,
                            diploma:string,
                            yearStart:string,
                            yearEnd:string
                        }],
        public professionnal_career:[{
                            period:string,
                            organization:string,
                            job:string,
                            task_description:string,
        }],
        public certifications:[{
                            year:string
                            domain:string
        }],
        public projets:[{
                            organization:string,
                            title:string,
                            description:string,
        }],
        public skills : [string],
    ){}
}