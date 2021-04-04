import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MyGameStartComponent } from './components/my-game-start/my-game-start.component';
import { MyGameListComponent } from './components/my-game-list/my-game-list.component';

@NgModule({
  declarations: [MyGameListComponent, MyGameStartComponent, MyGameListComponent],
  imports: [CommonModule, HttpClientModule, DragDropModule, MatCardModule],
  exports: [MyGameListComponent, MyGameStartComponent],
  providers: [],
})
export class MyGameModule {}
