import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  userData = {
    name: '',
    email: '',
    password: '',
  };

  Register() {
    this.auth.registerUser(this.userData).subscribe(
      (res) => console.log('res', res),
      (error) => console.log('error', error),
    );
  }
}
