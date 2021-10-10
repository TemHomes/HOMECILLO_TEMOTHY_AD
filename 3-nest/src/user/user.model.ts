import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';

export class User{
    private id:string;
    private name:string;
    private age:number;
    private email:string;
    private password:string;

    constructor(name:string, age:number, email:string, password:string){
        this.id = Helper.generateUID();
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
    }
    setID(id:string){
        this.id = id;
    }
    setName(name:string){
        this.name = name;
    }
    setAge(age:number){
        this.age = age;
    }
    setEmail(email:string){
        this.email = email;
    }
    setPassword(password:string){
        this.password = password;
    }
    getID(){
        return this.id;
    }
    search(searchKey:string): boolean{
        var keys: Array<string> = Helper.describeClass(User);
        keys = Helper.removeItemOnce(keys, 'password');
        for(const key of keys){
            if(`${this[key]}` === searchKey){
                return true;
            }
        }
        return false;
    }
    login(password:string): CRUDReturn{
        try{
            if(this.password === password){
                return {
                    success: true,
                    data: this.toJson()
                };
            }else{
                throw new Error("Incorrect credentials!")
            }
        }catch(err){
            return {
                success: false,
                data: err.message
            };
        }
    }
    checkContent(info:any): boolean{
        if(info.name == undefined || info.age == undefined || info.email == undefined || info.password == undefined){
            return false;
        }else{
            return true;
        }
    }
    toJson(){
        return {
            id:this.id,
            name:this.name,
            age:this.age,
            email:this.email
        };
    }
    toJsonWithPass(){
        return {
            id:this.id,
            name:this.name,
            age:this.age,
            email:this.email,
            password:this.password
        };
    }
}