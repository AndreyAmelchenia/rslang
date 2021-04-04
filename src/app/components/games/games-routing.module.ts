import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesListComponent } from './components/games-list/games-list.component';
import { AboutUsListComponent } from '../aboutUs/components/about-us-list/about-us-list.component';

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
