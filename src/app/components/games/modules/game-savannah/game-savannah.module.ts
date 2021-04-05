import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameSavannahComponent } from './game-savannah/game-savannah.component';
import { GameSavannahHeadComponent } from './components/game-savannah-head/game-savannah-head.component';
import { GameSavannahStartBannerComponent } from './components/game-savannah-start-banner/game-savannah-start-banner.component';
import { GameSavannahListComponent } from './components/game-savannah-list/game-savannah-list.component';

const routes: Routes = [
  {
    path: '',
    component: GameSavannahComponent,
  },
];

@NgModule({
  declarations: [
    GameSavannahComponent,
    GameSavannahHeadComponent,
    GameSavannahStartBannerComponent,
    GameSavannahListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameSavannahModule {}
