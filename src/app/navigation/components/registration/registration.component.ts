import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { signUp } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(private auth: AuthService, private store: Store, private location: Location) {}

  path = null;

  userData = {
    name: '',
    email: '',
    password: '',
  };

  Register() {
    this.store.dispatch(signUp({ user: this.userData }));
  }

  goBack() {
    this.location.back();
  }
}
