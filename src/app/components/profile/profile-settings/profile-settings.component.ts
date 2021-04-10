import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Settings } from 'src/app/common/models/settings.model';
import { SettingsService } from 'src/app/common/services/settings.service';
import { saveSettings } from 'src/app/redux/actions/settings.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectSettings } from 'src/app/redux/selectors/settings.selector';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  settings: Settings;

  data: any;

  formGroup: FormGroup;

  wordsPerDay: number;

  constructor(
    private store: Store<AppState>,
    private settingsService: SettingsService,
    formBuilder: FormBuilder,
  ) {
    this.store.select(selectSettings).subscribe((settings) => {
      this.settings = settings;
    });

    this.wordsPerDay = this.settings.wordsPerDay;

    this.formGroup = formBuilder.group({
      wordsPerDay: this.settings.wordsPerDay,
      displayTranslation: this.settings.optional.displayTranslation,
      displayHandlingButtons: this.settings.optional.displayHandlingButtons,
    });
  }

  onSliderChange($event) {
    this.wordsPerDay = $event.value;
  }

  onFormSubmit() {
    const { wordsPerDay, displayTranslation, displayHandlingButtons } = this.formGroup.value;
    const payload = {
      wordsPerDay,
      optional: {
        displayTranslation,
        displayHandlingButtons,
      },
    };
    this.store.dispatch(saveSettings({ payload }));
  }
}
