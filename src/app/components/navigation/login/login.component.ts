import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthService } from '../services/auth.service';
import { login } from '../../../redux/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public auth: AuthService,
    private store: Store<AppState>,
    private location: Location,
  ) {}

  userData = {
    email: '',
    password: '',
  };

  Login() {
    this.store.dispatch(login({ user: this.userData }));
  }

  goBack() {
    this.location.back();
  }
}
