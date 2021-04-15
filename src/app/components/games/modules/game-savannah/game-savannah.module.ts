import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { GameSavannahComponent } from './components/game-savannah/game-savannah.component';
import { GameSavannahHeadComponent } from './components/game-savannah-head/game-savannah-head.component';
import { GameSavannahStartBannerComponent } from './components/game-savannah-start-banner/game-savannah-start-banner.component';
import { GameSavannahListComponent } from './components/game-savannah-list/game-savannah-list.component';
import { GameSavannahStatisticsComponent } from './components/game-savannah-statistics/game-savannah-statistics.component';
import { GameSavannahDialogComponent } from './components/game-savannah-dialog/game-savannah-dialog.component';
import { GamesSharedModule } from '../games-shared.module';

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
    GameSavannahStatisticsComponent,
    GameSavannahDialogComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes), GamesSharedModule],
  exports: [RouterModule],
})
export class GameSavannahModule {}
