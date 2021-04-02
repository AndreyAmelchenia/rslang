import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Word } from 'src/app/common/models/word.model';
import { CssConstants } from 'src/app/shared/constants/css-constants';
import { GamesSprintService } from '../../services/games-sprint.service';

@Component({
  selector: 'app-games-sprint-card',
  templateUrl: './games-sprint-card.component.html',
  styleUrls: ['./games-sprint-card.component.scss'],
  providers: [GamesSprintService],
})
export class GamesSprintCardComponent implements OnInit {
  @Input() word: Word;

  @Input() translation: Word;

  @Output() reaction = new EventEmitter<{ reaction: boolean; word: string; translation: string }>();

  cols = 3; // CssConstants.materialColumnsNumberSmall;

  rowHeight = '100px';

  constructor(private gamesSprintService: GamesSprintService, private router: Router) {}

  ngOnInit(): void {
    //  this.words$ = this.gamesSprintService.getWords();
     // this.cssChange();
  }

  onAgree(word, translation) {
    window.alert('Agree');
    this.reaction.emit({ reaction: true, word, translation });
  }

  onDisagree(word, translation) {
    window.alert('Disagree');
    this.reaction.emit({ reaction: false, word, translation });
  }
}
