import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: Map<string, User> = new Map<string, User>();

    getAll(){
        var populatedData = [];
        for(const user of this.users.values()){
            populatedData.push(user.toJson());
        }
        return populatedData;
    }
    getSpecificUser(id:string){
        try {
            return this.users.get(id).toJson();
        }
        catch(err) {
            return {
                message: "An error has occured. Cannot locate user."
            };
        }
    }
    addUser(user:any){
        try {
            var newUser: User; 
            var ID = Math.random().toString(36).substr(2, 9);
            newUser = new User(ID, user?.name, user?.age, user?.email, user?.password);
            this.users.set(ID, newUser);
            this.logAllUsers();
            return {
                message: "Successfully registered user."
            };
        }
        catch(err) {
            return {
                message: "An error has occured. Cannot register user."
            };
        }
    }
    loginUser(userCredentials:any){
        var userFound;
        for(const user of this.users.values()){
            userFound = user.login(userCredentials.email, userCredentials.password);
            if(userFound){
                return {
                    login: true,
                    message: "Logged in successfully."
                }
            }
        }
        if(!userFound){
            return {
                login: false,
                message: "Incorrect credentials!"
            }
        }
    }
    deleteUser(id:string){
        if(this.users.has(id)){
            this.users.delete(id);
            return {
                message: "Successfully deleted user."
            }
        }
        else{
            return {
                message: "User not found."
            }
        }
    }
    replaceUser(id:string, user:any){
        var newUser: User;
        var completeInfo;
        newUser = new User(id, user.name, user.age, user.email, user.password);
        completeInfo = newUser.edit(user);
        if(completeInfo && this.users.has(id)){
            this.users.set(id, newUser);
            return{
                message: "Details successfully updated."
            }
        }else{
            return{
                message: "Incomplete details or user does not exist!"
            }
        }
    }
    replaceSomeDetails(id:string, user:any){
        try{
            if(user.name != undefined){
                this.users.get(id).setName(user?.name);
            }
            if(user.age != undefined){
                this.users.get(id).setAge(user?.age);
            }
            if(user.email != undefined){
                this.users.get(id).setEmail(user?.email);
            }
            if(user.password != undefined){
                this.users.get(id).setPassword(user?.password);
            }
            return {
                message: "Details successfully updated."
            };
        }
        catch(err) {
            return {
                message: "An error has occured. Cannot locate user."
            };
        }
    }
    searchUserData(term:string){
        var populatedData = [];
        var match;
        for(const user of this.users.values()){
            match = user.search(term);
            if(match){
                populatedData.push(user.toJson());
            }
        }
        return populatedData;
    }
    logAllUsers(){
        for(const [key,user] of this.users.entries()){
          console.log(key);
        }
    }
}
