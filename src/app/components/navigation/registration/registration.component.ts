import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { signUp } from '../../../redux/actions/auth.actions';

const myNameValidator = (control: FormControl) => {
  const condition = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+/-/_/@/$/!/%/*/?/&/#/./,/;/:/[/{/}/])[0-9a-zA-Z+/-/_/@/$/!/%/*/?/&/#/./,/;/:/[/{/}/]{8,}/.test(
    control.value,
  );
  if (!condition) {
    return { password: 'does not match the condition' };
  }
  return null;
};

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(
    private auth: AuthService,
    private store: Store,
    private location: Location,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
  ) {}

  path = null;

  formData = new FormData();

  userData = this.formBuilder.group({
    name: '',
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, myNameValidator]],
    filedata: '',
  });

  Register() {
    this.store.dispatch(signUp({ user: this.userData.value }));
  }

  goBack() {
    console.log(this.userData.value);

    // this.location.back();
  }

  onFileChange(event, field) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      if (!file.type.startsWith('image')) {
        this.userData.get(field).setErrors({
          required: true,
        });
        this.cd.markForCheck();
      } else {
        this.formData.append(field, file);
        console.log(this.userData.value[field]);
        this.cd.markForCheck();
      }
    }
  }

  onSubmit(): void {
    Object.entries(this.userData.value).forEach(([key, value]: any[]) => {
      this.formData.append(key, value);
    });
    if (!this.userData.invalid) {
      this.store.dispatch(signUp({ user: this.formData }));
      this.userData.reset();
      this.formData = new FormData();
    }
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
