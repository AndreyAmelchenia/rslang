import { Component } from '@angular/core';
import { WordsService } from 'src/app/common/services/words-service/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rslang';

  constructor(private wordsService: WordsService) {}
}
