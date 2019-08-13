import { Component, OnInit } from '@angular/core';

import { GardenService } from '../garden.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private gardenService: GardenService) { }

  ngOnInit() {
  }

  login(email: string, password: string): void {
    if (!email || !password) {
      return;
    }
    this.gardenService.login(email, password)
      .subscribe((response) => console.log(response));
  }

}
