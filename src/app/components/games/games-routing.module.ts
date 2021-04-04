import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';
import { GamesSprintComponent } from './components/games-sprint/games-sprint.component';

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
        component: GamesSprintComponent,
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
