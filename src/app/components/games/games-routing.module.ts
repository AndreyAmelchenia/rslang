import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';
import { GameSavannahComponent } from './modules/game-savannah/game-savannah/game-savannah.component';
import { MyGameStartComponent } from './components/my-game/components/my-game-start/my-game-start.component';
import { MyGameListComponent } from './components/my-game/components/my-game-list/my-game-list.component';

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
        loadChildren: () =>
          import('./modules/games-sprint/games-sprint-routing.module').then(
            (m) => m.GamesSprintRoutingModule,
          ),
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
        path: 'my-game',
        component: MyGameStartComponent,
      },
      {
        path: 'my-game-start',
        component: MyGameListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
