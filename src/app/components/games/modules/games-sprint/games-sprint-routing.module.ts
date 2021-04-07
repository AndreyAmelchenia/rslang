import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesSprintPlayComponent } from './components/games-sprint-play/games-sprint-play.component';
import { GamesSprintMainComponent } from './components/games-sprint-main/games-sprint-main.component';
import { GamesSprintEndComponent } from './components/games-sprint-end/games-sprint-end.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GamesSprintMainComponent,
      },
      {
        path: 'play',
        component: GamesSprintPlayComponent,
      },
      {
        path: 'play/end',
        component: GamesSprintEndComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GamesSprintRoutingModule {}
