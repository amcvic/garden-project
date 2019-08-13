import { Component, OnInit } from '@angular/core';

import { GardenService } from '../garden.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: User;

  constructor(private gardenService: GardenService) { }

  ngOnInit() {
  }

  login(email: string, password: string): void {
    this.currentUser = new User();
    this.currentUser.email = email;
    this.currentUser.password = password;
    if (!email || !password) {
      return;
    }
    this.gardenService.login(this.currentUser)
      .subscribe((val) => console.log(val));
  }

}
