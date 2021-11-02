import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private api: ApiService) { }
  fcEmail = new FormControl();
  fcPassword = new FormControl();
  ngOnInit(): void {}

  async login(){
    var result:any = await this.api.post("/user/login",{
      "email": this.fcEmail.value, 
      "password": this.fcPassword.value
    });

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