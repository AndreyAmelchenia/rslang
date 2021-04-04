import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-game-start',
  templateUrl: './my-game-start.component.html',
  styleUrls: ['./my-game-start.component.scss']
})
export class MyGameStartComponent {

  constructor(private router: Router) { }

  onStartGame() {
    this.router.navigate(['/my-game-start']);
  }

}
