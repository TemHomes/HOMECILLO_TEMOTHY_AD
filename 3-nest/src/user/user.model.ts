export class User{
    private id:string;
    private name:string;
    private age:number;
    private email:string;
    private password:string;

    constructor(id:string, name:string, age:number, email:string, password:string){
        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.password = password;
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
    login(email:string, password:string){
        if(this.email == email && this.password == password){
            return true;
        }else{
            return false;
        }
    }
    search(searchKey:string){
        if(searchKey.toUpperCase() == this.name.toUpperCase() || searchKey.toUpperCase() == this.age.toString().toUpperCase() || 
           searchKey.toUpperCase() == this.email.toUpperCase() || searchKey.toUpperCase() == this.id.toUpperCase()){
            return true;
        }
        else{
            return false;
        }
    }
    edit(info:any){
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
}