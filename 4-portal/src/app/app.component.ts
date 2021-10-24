import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portal';
  userEmail: string = "null";
  userPassword: string = "null";

  login(email:string, password:string){
    this.userEmail = email;
    this.userPassword = password;
  }
}
