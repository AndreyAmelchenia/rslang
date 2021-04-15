import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-games-settings-dialog',
  templateUrl: './games-settings-dialog.component.html',
  styleUrls: ['./games-settings-dialog.component.scss'],
})
export class GamesSettingsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
