import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsListComponent } from '../../aboutUs/components/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsListComponent },
  {
    path: 'games',
    loadChildren: () =>
      import('../../games/games-routing.module').then((m) => m.GamesRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
