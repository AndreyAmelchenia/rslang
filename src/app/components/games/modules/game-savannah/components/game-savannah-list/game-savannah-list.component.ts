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

  @Input() answer: string;

  @Input() time = '--time: 5s;';

  @Output() checked = new EventEmitter();

  current = '';

  checkedAnswer(answer: string): void {
    this.current = this.answer;
    const timerId = setTimeout(() => {
      this.checked.emit(answer);
      clearTimeout(timerId);
    }, 500);
  }
}
