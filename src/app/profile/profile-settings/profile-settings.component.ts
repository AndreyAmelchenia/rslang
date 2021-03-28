import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Settings } from 'src/app/models/settings.model';
import { setSettings } from 'src/app/state/actions/settings.actions';
import { AppState } from 'src/app/state/app.state';
import { selectSettings } from 'src/app/state/selectors/settings.selector';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  settings: Settings;

  formGroup: FormGroup;

  constructor(private store: Store<AppState>, formBuilder: FormBuilder) {
    this.store.select(selectSettings).subscribe((settings) => {
      this.settings = settings;
    });

    this.formGroup = formBuilder.group({
      displayTranslation: this.settings.displayTranslation,
      displayHandlingButtons: this.settings.displayHandlingButtons,
    });
  }

  onFormSubmit() {
    this.store.dispatch(setSettings({ payload: this.formGroup.value }));
  }
}
