import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../common/guards/login.guard';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';
import { GamesSprintMainComponent } from './modules/games-sprint/components/games-sprint-main/games-sprint-main.component';
import { MyGameStartComponent } from './modules/my-game/components/my-game-start/my-game-start.component';
import { MyGameListComponent } from './modules/my-game/components/my-game-list/my-game-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamesListComponent,
      },
      {
        path: 'sprint',
        component: GamesSprintMainComponent,
      },
      {
        path: 'audio',
        component: AboutUsListComponent,
      },
      {
        path: 'savanna',
        component: AboutUsListComponent,
      },
      {
        path: 'my-game',
        loadChildren: () => import('./modules/my-game/my-game.module').then((m) => m.MyGameModule),
        canActivate: [LoginGuard],
        canLoad: [LoginGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
