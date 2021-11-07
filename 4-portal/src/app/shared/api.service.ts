import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private subject = new Subject<any>();
  public data = this.subject.asObservable();

  constructor(private api: HttpClient) { }
  
  sendClickEvent(term:any){
    this.subject.next(term);
  }
  
  async post(url:string, body:any):Promise<any>{
    try{
      return await this.api.post(environment.API_URL+url, body).toPromise();
    }catch(err){
      console.log(err);
      return null;
    }
  }
  async get(){
    try{
      return await this.api.get(environment.API_URL+"/user/all").toPromise();
    }catch(err){
      console.log(err);
      return null;
    }
  }
  async search(term:string){
    try{
      return await this.api.get(environment.API_URL+"/user/search/"+term).toPromise();
    }catch(err){
      console.log(err);
      return null;
    }
  }
  async delete(id:string){
    try{
      return await this.api.delete(environment.API_URL+"/user/"+id).toPromise();
    }catch(err){
      console.log(err);
      return null;
    }
  }
  async patch(id:string, body:any){
    try{
      return await this.api.patch(environment.API_URL+"/user/"+id, body).toPromise();
    }catch(err){
      console.log(err);
      return null;
    }
  }
}