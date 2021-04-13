import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/shared/material/material.module';
import { MyGameStartComponent } from './components/my-game-start/my-game-start.component';
import { MyGameListComponent } from './components/my-game-list/my-game-list.component';
import { DialogTotalGameComponent } from './components/dialog-total-game/dialog-total-game.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MyGameListComponent,
    MyGameStartComponent,
    MyGameListComponent,
    DialogTotalGameComponent,
  ],
  entryComponents: [DialogTotalGameComponent],
  imports: [CommonModule, HttpClientModule, DragDropModule, MatCardModule, AngularMaterialModule, SharedModule],
  exports: [MyGameListComponent, MyGameStartComponent],
  providers: [], 
})
export class MyGameModule {}
