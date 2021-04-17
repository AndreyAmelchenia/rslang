import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { login } from 'src/app/redux/actions/auth.actions';
import { AppState } from 'src/app/redux/app.state';
import { Observable } from 'rxjs';
import { isLoginSelector } from 'src/app/redux/selectors/auth.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../common/services/auth.service';

const myNameValidator = (control: FormControl) => {
  const condition = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+/-/_/@/$/!/%/*/?/&/#/./,/;/:/{/}/])[0-9a-zA-Z+/-/_/@/$/!/%/*/?/&/#/./,/;/:/[/{/}/]{8,}/.test(
    control.value,
  );
  if (!condition) {
    return { password: 'does not match the condition' };
  }
  return null;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, myNameValidator]],
  });

  isAuth$: Observable<boolean>;

  constructor(
    public auth: AuthService,
    private store: Store<AppState>,
    private location: Location,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {}

  ngOnInit(): void {
    this.store.select(isLoginSelector).subscribe((data) => {
      if (data) {
        this.dialogRef.close();
      }
    });
  }

  onSubmit(): void {
    if (!this.userData.invalid) {
      this.store.dispatch(login({ user: this.userData.value, reg: false }));
    }
  }

  goBack() {
    this.location.back();
  }

  getErrorEmailMessage() {
    if (this.userData.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userData.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPasswordMessage() {
    if (this.userData.controls.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userData.controls.password.hasError('password') ? 'Not a valid password' : '';
  }
}
