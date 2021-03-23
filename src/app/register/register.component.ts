import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerUserData = {
    name: '',
    email: '',
    password: '',
  };

  Register() {
    console.log(this.registerUserData);
  }
}
