import { Component, OnInit } from '@angular/core';

import { GardenService } from '../garden.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private gardenService: GardenService) { }

  modal: any = document.getElementById('myModal');
  span: any = document.getElementsByClassName('close')[0];

  ngOnInit() {
    this.modal.style.display = 'block';
    this.span.onclick = function() {
      this.modal.style.display = 'none';
    }
  }

  login(email: string, password: string): void {
    if (!email || !password) {
      return;
    }
    this.gardenService.login(email, password)
      .subscribe((response) => {localStorage.setItem('token', response.token);console.log(`logged in as user: ${response.loggedInUser.email}`)});
  }

  logout(): void {
    localStorage.clear();
  }

}
