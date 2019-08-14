import { Component, OnInit } from '@angular/core';

import { GardenService } from '../garden.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private gardenService: GardenService) { }

  sessionToken: string;
  loggedIn: boolean;

  ngOnInit() {
    this.sessionToken = localStorage.getItem('token');
    if (this.sessionToken) {
      this.loggedIn = true;
    }
  }

  login(email: string, password: string): void {
    if (!email || !password) {
      return;
    }
    this.gardenService.login(email, password)
      .subscribe((response) => {localStorage.setItem('token', response.token);console.log(`logged in as user: ${response.loggedInUser.email}`);this.loggedIn=true;});
  }

  logout(): void {
    localStorage.clear();
    this.sessionToken = '';
    this.loggedIn=false;
  }

}
