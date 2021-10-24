import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private api: HttpClient) { }

  ngOnInit(): void {}

  populatedData:any = [];
  
  async getAll(){
    this.populatedData.splice(0, this.populatedData.length);
    var result:any = await this.api.get(environment.API_URL+"/user/all").toPromise();
    for(const users of result.data){
      this.populatedData.push(users);
    }
  }
  nav(destination:string){
    this.router.navigate([destination]);
  }
}