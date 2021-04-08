import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-games-sprint-end',
  templateUrl: './games-sprint-end.component.html',
  styleUrls: ['./games-sprint-end.component.scss'],
})
export class GamesSprintEndComponent {
  @Input() score = 0;

  @Input() countWords = 0;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
