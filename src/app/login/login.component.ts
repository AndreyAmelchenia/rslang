import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  userData = {
    email: '',
    password: '',
  };

  Login() {
    this.auth.loginUser(this.userData).subscribe(
      (res) => console.log('res', res),
      (error) => console.log('error', error),
    );
  }
}
