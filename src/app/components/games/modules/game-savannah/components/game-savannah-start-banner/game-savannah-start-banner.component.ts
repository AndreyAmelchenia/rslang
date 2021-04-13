import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { GameSavannahLangs } from '../../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../../models/game-savannah-status.model';

@Component({
  selector: 'app-game-savannah-start-banner',
  templateUrl: './game-savannah-start-banner.component.html',
  styleUrls: ['./game-savannah-start-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahStartBannerComponent {
  @Input() gameSavannahStatus: GameSavannahStatus;

  @Output() startGame = new EventEmitter();

  @Output() changeLang = new EventEmitter();

  langs: string[] = Object.keys(GameSavannahLangs).map((key) => GameSavannahLangs[key]);

  startGameEmmiter(): void {
    this.startGame.emit();
  }

  changeCurrentLang(key: string): void {
    this.gameSavannahStatus.currentLang = GameSavannahLangs[key];
    this.changeLang.emit(this.gameSavannahStatus);
  }
}
