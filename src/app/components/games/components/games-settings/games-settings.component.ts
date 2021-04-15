import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GamesSettingsDialogComponent } from '../games-settings-dialog/games-settings-dialog.component';

@Component({
  selector: 'app-games-settings',
  templateUrl: './games-settings.component.html',
  styleUrls: ['./games-settings.component.scss'],
})
export class GamesSettingsComponent {
  wordsAmount: number[] = [10, 20, 30, 40, 50, 60];

  level: number[] = [1, 2, 3, 4, 5, 6];

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(public dialog: MatDialog) {}

  openDialogSettings() {
    const dialogRef = this.dialog.open(GamesSettingsDialogComponent, {
      width: '400px',
      height: '400px',
      data: {
        wordsAmountData: this.wordsAmount,
        levelChosen: this.level,
      },
    });

    dialogRef.afterClosed().subscribe();
  }
}
