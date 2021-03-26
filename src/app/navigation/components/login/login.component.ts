import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  userData = {
    email: '',
    password: '',
  };

  Login() {
    console.log('click');
    this.auth.loginUser(this.userData).subscribe(
      (res) => {
        console.log('res', res);
        localStorage.setItem('token', res.token);
      },
      (error) => console.log('error', error),
    );
  }

  Logout() {
    this.auth.logout();
  }
}
