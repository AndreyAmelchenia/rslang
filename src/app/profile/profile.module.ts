import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@NgModule({
  declarations: [ProfileComponent, ProfileStatsComponent, ProfileSettingsComponent],
  exports: [],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProfileModule {}
