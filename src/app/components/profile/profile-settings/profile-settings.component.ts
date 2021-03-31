import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Settings } from 'src/app/common/models/settings.model';
import { SettingsService } from 'src/app/common/services/settings.service';
import { AppState } from 'src/app/redux/app.state';
import { selectSettings } from 'src/app/redux/selectors/settings.selector';
// import { setSettings } from '../../../redux/actions/settings.actions';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  settings: Settings;

  data: any;

  formGroup: FormGroup;

  value: number;

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService,
    formBuilder: FormBuilder,
  ) {
    this.store.select(selectSettings).subscribe((settings) => {
      this.settings = settings;
    });

    this.value = this.settings.wordsPerDay;

    this.formGroup = formBuilder.group({
      wordsPerDay: this.settings.wordsPerDay,
      displayTranslation: this.settings.optional.displayTranslation,
      displayHandlingButtons: this.settings.optional.displayHandlingButtons,
    });
  }

  onFormSubmit() {
    // this.store.dispatch(setSettings({ payload: this.formGroup.value }));

    const { wordsPerDay, displayTranslation, displayHandlingButtons } = this.formGroup.value;
    const payload = {
      wordsPerDay,
      optional: {
        displayTranslation,
        displayHandlingButtons,
      },
    };

    this.settingsService.saveSettings(payload).subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }
}
