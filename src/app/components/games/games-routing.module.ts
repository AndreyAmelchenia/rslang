import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';
import { GamesSprintComponent } from './components/games-sprint/games-sprint.component';
import { GameSavannahComponent } from './modules/game-savannah/game-savannah/game-savannah.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamesListComponent,
      },
      {
        path: 'Sprint',
        component: GamesSprintComponent,
      },
      {
        path: 'Audio',
        component: AboutUsListComponent,
      },
      {
        path: 'Savanna',
        component: GameSavannahComponent,
      },
      {
        path: 'My game',
        component: AboutUsListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
