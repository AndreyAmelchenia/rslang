import { Component } from '@angular/core';

@Component({
  selector: 'app-game-savannah',
  templateUrl: './game-savannah.component.html',
  styleUrls: ['./game-savannah.component.scss'],
})
export class GameSavannahComponent {
  errors = 2;

  attempts = new Array(5);

  sound = true;

  counter(i: number): number[] {
    return new Array(i);
  }

  changeSound(): void {
    this.sound = !this.sound;
  }
}
