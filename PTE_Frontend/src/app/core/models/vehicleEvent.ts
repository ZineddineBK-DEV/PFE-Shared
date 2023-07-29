import { User } from "./user"
import { Vehicle } from "./vehicle"

export class VehicleEvent{
     _id!:string
     title!:String
     start!:Date
     end!:Date
     vehicle!:Vehicle
     driver!:User
     destination!:String
     isAccepted:Boolean=true
    constructor(vehicleEvent:VehicleEvent){}

    }