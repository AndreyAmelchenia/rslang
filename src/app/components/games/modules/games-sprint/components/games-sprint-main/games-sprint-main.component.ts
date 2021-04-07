import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-games-sprint-main',
  templateUrl: './games-sprint-main.component.html',
  styleUrls: ['./games-sprint-main.component.scss'],
})
export class GamesSprintMainComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
