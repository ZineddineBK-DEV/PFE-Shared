import { Cv } from "./cv";
export class User{
         _id?:string
         firstName?:string
         lastName?:string
         phone?:string 
         email?:string
         password?:string
         image?:string
         nationality?:string
         familySituation?:string
         birthDate?:Date
         address?:string
         departement?:string
         drivingLisence?:boolean
         gender?:string
         experience?:number
         hiringDate?:Date
         roles?:string
         title?:string
         cv?:Cv
         token?:string
         
}