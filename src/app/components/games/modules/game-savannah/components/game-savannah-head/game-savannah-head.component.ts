import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
import { GameSavannahLangs } from '../../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../../models/game-savannah-status.model';
// import { Level } from '../../models/levels.model';

@Component({
  selector: 'app-game-savannah-head',
  templateUrl: './game-savannah-head.component.html',
  styleUrls: ['./game-savannah-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahHeadComponent {
  @Input() gameSavannahStatus: GameSavannahStatus;

  @Output() changeStatus = new EventEmitter();

  langs: string[] = Object.keys(GameSavannahLangs).map((key) => GameSavannahLangs[key]);

  attempts = new Array(5);

  // gameLevels = new FormControl('', Validators.required);

  // levels: Level[] = [
  //   { name: 'Beginner', value: 0 },
  //   { name: 'Intermediate', value: 1 },
  //   { name: 'Advanced', value: 2 },
  //   { name: 'Expert', value: 3 },
  // ];

  changeLang(key: string): void {
    this.gameSavannahStatus.currentLang = GameSavannahLangs[key];
    this.changeStatus.emit(this.gameSavannahStatus);
  }

  changeSound(): void {
    this.gameSavannahStatus.sound = !this.gameSavannahStatus.sound;
    this.changeStatus.emit(this.gameSavannahStatus);
  }
}
