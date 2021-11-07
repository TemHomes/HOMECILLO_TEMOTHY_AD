import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {}

  searchTerm = new FormControl();

  search(){
    this.delay(1000);
    this.api.sendClickEvent(this.searchTerm.value);
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}