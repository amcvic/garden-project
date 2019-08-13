import { Component, OnInit } from '@angular/core';

import { GardenService } from '../garden.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private token: string;

  constructor(private gardenService: GardenService) { }

  ngOnInit() {
  }

  login(email: string, password: string): void {
    if (!email || !password) {
      return;
    }
    this.gardenService.login(email, password)
      .subscribe((response) => {this.token=response.token;localStorage.setItem('token', response.token);console.log(`logged in as user: ${response.loggedInUser.email}`)});
  }

  logout(): void {
    localStorage.clear();
  }

}
