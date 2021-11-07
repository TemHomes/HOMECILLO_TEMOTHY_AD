import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router, private api: ApiService) { }

  registerForm: FormGroup = new FormGroup({
    fcName: new FormControl('', Validators.required),
    fcAge: new FormControl('', Validators.min(1)),
    fcEmail: new FormControl('', Validators.required),
    fcPassword: new FormControl('', Validators.required),
    fcConfirmPassword: new FormControl('', Validators.required)
  });

  error: string = '';

  ngOnInit(): void {}

  async onSubmit(){
    var result:any;
    if (
      this.registerForm.value['fcPassword'] !==
      this.registerForm.value['fcConfirmPassword']
    ) {
      this.error = 'Password doesnt match!';
      return;
    }
    if (!this.registerForm.valid) {
      {
        this.error = 'No fields must be empty';
        return;
      }
    }
    if (this.registerForm.valid) {
      this.error = '';
      var payload: {
        name: string;
        email: string;
        age: number;
        password: string;
      };
      payload = {
        name: this.registerForm.value.fcName,
        age: this.registerForm.value.fcAge,
        email: this.registerForm.value.fcEmail,
        password: this.registerForm.value.fcPassword,
      };
      result = await this.api.post("/user/register", payload);
    }
    if(result.success){
      this.nav('home');
    }else if(!result.success){
      alert(result.data)
    }
  }

  login(){
    this.nav('login');
  }
  nav(destination:string){
    this.router.navigate([destination]);
  }
}