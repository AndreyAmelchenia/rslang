import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-savannah-list',
  templateUrl: './game-savannah-list.component.html',
  styleUrls: ['./game-savannah-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSavannahListComponent {
  @Input() currentWord: string;

  @Input() answers: string[];

  @Output() checked = new EventEmitter();

  checkedAnswer(answer: string): void {
    this.checked.emit(answer);
  }
}
