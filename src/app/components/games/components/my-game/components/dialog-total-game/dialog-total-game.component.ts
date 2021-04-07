import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-total-game',
  templateUrl: './dialog-total-game.component.html',
  styleUrls: ['./dialog-total-game.component.scss'],
})
export class DialogTotalGameComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {}

  dialogPlayAgainClick() {
    this.router.navigate(['/my-game']);
  }

  dialogExitClick() {
    this.router.navigate(['/games']);
  }
}
