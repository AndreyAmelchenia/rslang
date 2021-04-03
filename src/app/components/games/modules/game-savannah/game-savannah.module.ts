import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameSavannahComponent } from './game-savannah/game-savannah.component';
import { GameSavannahHeadComponent } from './components/game-savannah-head/game-savannah-head.component';

const routes: Routes = [
  {
    path: '',
    component: GameSavannahComponent,
  },
];

@NgModule({
  declarations: [GameSavannahComponent, GameSavannahHeadComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameSavannahModule {}
