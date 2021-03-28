import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsListComponent } from 'src/app/cards/cards-list/cards-list.component';

import { GamesListComponent } from 'src/app/games/components/games-list/games-list.component';
import { AboutUsListComponent } from '../../aboutUs/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsListComponent },
  { path: 'cards', component: CardsListComponent },
  { path: 'games', component: GamesListComponent },
];
// CardsListComponent
// const appRoutes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' }, { path: '' }];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
