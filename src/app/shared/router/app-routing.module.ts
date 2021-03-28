import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsListComponent } from 'src/app/cards/cards-list/cards-list.component';
import { ProfileComponent } from 'src/app/profile/profile/profile.component';

import { AboutUsListComponent } from '../../aboutUs/components/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsListComponent },
  { path: 'cards', component: CardsListComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'games',
    loadChildren: () =>
      import('../../games/games-routing.module').then((m) => m.GamesRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
