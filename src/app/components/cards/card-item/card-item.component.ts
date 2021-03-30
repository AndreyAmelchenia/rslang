import { Component, Input } from '@angular/core';
import { Word } from 'src/app/common/models/word.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
})
export class CardItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  colorRGB(color: number[]): string {
    return `rgba(${[...color, 0.3].join()})`;
  }
}
