import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';
import { GamesSprintComponent } from './components/games-sprint/games-sprint.component';
import { AudioChallengeGameComponent } from './components/audio-challenge-game/audio-challenge-game.component';

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
        component: AudioChallengeGameComponent,
      },
      {
        path: 'Savanna',
        component: AboutUsListComponent,
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
