import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private api: HttpClient) { }
  fcEmail = new FormControl();
  fcPassword = new FormControl();
  ngOnInit(): void {}

  async login(){
    var result:any = await this.api.post(environment.API_URL+"/user/login",{
      "email": this.fcEmail.value, 
      "password": this.fcPassword.value
    }).toPromise();

    if(result.success){
      this.nav('home');
    }else{
      alert("Credentials do not match!");
    }
  }
  nav(destination:string){
    this.router.navigate([destination]);
  }
}
