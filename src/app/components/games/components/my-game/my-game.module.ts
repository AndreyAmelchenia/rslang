import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyGameStartComponent } from './components/my-game-start/my-game-start.component';
import { MyGameListComponent } from './components/my-game-list/my-game-list.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MyGameListComponent, MyGameStartComponent, MyGameListComponent],
  imports: [CommonModule, HttpClientModule, DragDropModule, MatCardModule],
  exports: [MyGameListComponent, MyGameStartComponent],
  providers: [],
})
export class MyGameModule {}
