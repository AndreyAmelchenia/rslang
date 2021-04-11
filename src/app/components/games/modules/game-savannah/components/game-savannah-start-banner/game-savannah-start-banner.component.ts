import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-savannah-start-banner',
  templateUrl: './game-savannah-start-banner.component.html',
  styleUrls: ['./game-savannah-start-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahStartBannerComponent {
  @Output() startGame = new EventEmitter();

  startGameEmmiter(): void {
    this.startGame.emit();
  }
}
