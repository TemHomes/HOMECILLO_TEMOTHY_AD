import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { v4 as uuidv4 } from 'uuid';
import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
    private users: Map<string, User> = new Map<string, User>();
    private DB = admin.firestore();

    constructor(){
        //this.users = Helper.populate();
        //for(const user of this.users.values()){
            //.saveUser(user);
        //}
    }
    async getAll(): Promise<CRUDReturn>{
        var populatedData = [];
        try{
            var dbData = await this.DB.collection("users").get();
            dbData.forEach((doc) => {
                if(doc.exists){
                    populatedData.push({
                        id: doc.data()["id"],
                        name: doc.data()["name"],
                        age: doc.data()["age"],
                        email: doc.data()["email"]
                    });
                }
            });
            return {
                success: populatedData.length > 0,
                data: populatedData
            }
        }catch(err){
            return {
                success: false,
                data: "Error retrieving users!"
            }
        }
        /*var populatedData = [];
        for(const user of this.users.values()){
            populatedData.push(user.toJson());
        }
        return {
            success: true,
            data: populatedData
        };*/
    }
    async getSpecificUser(id:string): Promise<CRUDReturn>{
        try {
            var result = await this.DB.collection("users").doc(id).get();
            if (result.exists) {
                var obj = result.data();
                delete obj["password"];
                return {
                    success: true,
                    data: obj
                }
            } else {
                return {
                    success: false,
                    data: `User id ${id} does not exist!`
                }
            }
        } catch (err) {
            return {
                success: false,
                data: "Error retrieving user!"
            }
        }
        /*if(this.users.has(id)){
            return {
                success: true,
                data: this.users.get(id).toJson()
            }
        }else{
            return {
                success: false,
                data: `User ${id} is not in the database`
            };
        }*/
    }
    async addUser(user:any): Promise<CRUDReturn>{
        try {
            var emailUsed = await this.emailExists(user.email);
            var validBody: {valid:boolean; data: string} = Helper.validBody(user);
            if(validBody.valid){
                if(!emailUsed){
                    var newUser: User;
                    newUser = new User(user?.name, user?.age, user?.email, user?.password);
                    if(newUser.checkContent(user)){
                        if(this.saveUser(newUser)){
                            return {
                                success: true,
                                data: newUser.toJson()
                            };
                        }
                    }else{
                        throw new Error("Missing some information.")
                    }
                }else{
                    throw new Error(`${user.email} is already taken.`)
                }
            }else{
                throw new Error(validBody.data);
            }
        }
        catch(err) {
            return {
                success: false,
                data: err.message
            };
        }
    }
    async login(userCredentials:any): Promise<CRUDReturn>{
        try {
            var results = await this.DB.collection("users").where("email", "==", userCredentials.email).get();
            if(results.empty){
                return {
                    success: false,
                    data: "User does not exist!"
                }
            }
            for (const doc of results.docs){
                if(doc.data()["email"] === userCredentials.email){
                    if(doc.data()["password"] === userCredentials.password){
                        return {
                            success: true,
                            data: doc.data()
                        }
                    }
                }else{
                    return {
                        success: false,
                        data: "Invalid credentials entered!"
                    }
                }
            }
            return {
                success: false,
                data: "Invalid credentials entered!"
            }
        } catch (err) {
            return {
                success: false,
                data: "User does not exist!"
            }
        }
    }
    async deleteUser(id:string): Promise<CRUDReturn>{
        try {
            var result = await this.DB.collection("users").doc(id).get();
            if (result.exists) {
                await this.DB.collection("users").doc(id).delete();
                return {
                    success: true,
                    data: "Successfully deleted user."
                }
            }else{
                return {
                    success: false,
                    data: "User does not exist!"
                }
            }
        }catch(err){
            return {
                success: false,
                data: "Deletion failed."
            }
        }
        /*try{
            if(this.users.has(id)){
                this.users.delete(id);
                return {
                    success: true,
                    data: "Successfully deleted user."
                }
            }
            else{
                return {
                    success: false,
                    data: "User not found."
                }
            }
        }catch(err){
            return {
                success: false,
                data: "Deletion failed."
            }
        }*/
    }
    async replaceUser(id:string, user:any): Promise<CRUDReturn>{
        var newUser: User;
        var completeInfo:boolean;
        var emailUsed = await this.emailExists(user.email);
        var result = await this.DB.collection("users").doc(id).get();
        var validBody: {valid:boolean; data: string} = Helper.validBody(user);
        newUser = new User(user.name, user.age, user.email, user.password);
        completeInfo = newUser.checkContent(user);
        if(validBody.valid){
            if(result.exists){
                if(completeInfo){
                    if(!emailUsed){
                        newUser.setID(id);
                        this.saveUser(newUser);
                        return{
                            success: true,
                            data: "Details successfully updated."
                        }
                    }else{
                        return{
                            success: false,
                            data: "Email already taken."
                        }
                    }
                }else{
                    return{
                        success: false,
                        data: "Incomplete details!"
                    }
                }
            }else{
                return{
                    success: false,
                    data: "User does not exists!"
                }
            }
        }else{
            return{
                success: false,
                data: "Invalid entries!"
            }
        }
    }
    async replaceSomeDetails(id:string, user:any): Promise<CRUDReturn>{
        try{
            var emailUsed = await this.emailExists(user.email);
            var validBody: {valid:boolean; data: string} = Helper.validBody(user);
            
            if(validBody.valid){
                if(user.name != undefined || user.name != null){
                    await
                    this.DB.collection("users").doc(id).update({
                    name: user.name
                    });
                }
                if(user.age != undefined || user.age != null){
                    await
                    this.DB.collection("users").doc(id).update({
                    age: user.age
                    });
                }
                if(user.email != undefined && !emailUsed || user.email != null){
                    await
                    this.DB.collection("users").doc(id).update({
                    email: user.email
                    });
                }else if(user.email != undefined && emailUsed || user.email != null){
                    throw new Error("Email already exists!");
                }
                if(user.password != undefined || user.password != null){
                    await
                    this.DB.collection("users").doc(id).update({
                    password: user.password
                    });
                }
                return {
                    success: true,
                    data: "Details successfully updated."
                };
            }else{
                throw new Error("Invalid detail info type.")
            }
        }
        catch(err) {
            return {
                success: false,
                data: err.message
            };
        }
    }
    async searchUserData(term:string): Promise<CRUDReturn>{
        var populatedData: Array<any> = [];
        var keys: Array<string> = Helper.describeClass(User);
        keys = Helper.removeItemOnce(keys, 'password');
        var dbData = await this.DB.collection("users").get();
            dbData.forEach((doc) => {
                if(doc.exists){
                    for (const key of keys) {
                        if (doc.data()[key].toString() === term) {
                            populatedData.push({
                                id: doc.data()["id"],
                                name: doc.data()["name"],
                                age: doc.data()["age"],
                                email: doc.data()["email"]
                            });
                            break;
                        }
                    }
                }
            });
        return {
            success: populatedData.length > 0,
            data: populatedData
        }
        /*var populatedData: Array<any> = [];
        for(const user of this.users.values()){
            if(user.search(term))
                populatedData.push(user.toJson());
        }
        return {
            success: populatedData.length > 0,
            data: populatedData
        };*/
    }
    async emailExists(email: string, options?:{exceptionId: string}): Promise<boolean>{
        try {
            var results = await this.DB.collection("users").where("email", "==", email).get();
            if(results.empty){
                return false;
            }
            for (const doc of results.docs){
                if(options != undefined){
                    if(doc.id == options?.exceptionId){
                        continue;
                    }
                }
                if(doc.data()["email"] === email){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        } catch (err) {
            return false;
        }
        /*for (const user of this.users.values()) {
            if (user.search(email)) {
                return true;
            }
        }
        return false;*/
    }
    async saveUser(user: User): Promise<boolean>{
        try{
            var result = await this.DB.collection("users").doc(user.getID()).set(user.toJsonWithPass());
            console.log(result);
            
            this.users.set(user.getID(), user);
            return this.users.has(user.getID());
        }catch(err){
            return false;
        }
    }
    logAllUsers(){
        for(const [key,user] of this.users.entries()){
          console.log(key);
        }
    }
}