import {Injectable} from "@nestjs/common";
import {FilterQuery, Model} from "mongoose";
import {User} from "../schema/user";
@Injectable()
export class UserRepository {
   constructor(private readonly user:Model<User>){}
   
   async saveUser(user:User[]){
     return this.user.create(user)
   }

   async getUser(query:FilterQuery<User>){
    return this.user.findOne(query)
   }
   async getAll(query:FilterQuery<User>){
    
   }
}
