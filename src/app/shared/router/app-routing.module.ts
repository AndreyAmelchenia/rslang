import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesListComponent } from 'src/app/games/components/games-list/games-list.component';
import { AboutUsListComponent } from '../../aboutUs/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsListComponent },
  { path: 'games', component: GamesListComponent },
];

// const appRoutes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' }, { path: '' }];
@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
