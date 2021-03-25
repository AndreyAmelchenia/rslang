import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(private auth: AuthService) {}

  path = null;

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
