import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesListComponent } from 'src/app/games/components/games-list/games-list.component';
import { RegistrationComponent } from '../../navigation/registration/registration.component';
import { Path } from './roter.modele';
import { AboutUsListComponent } from '../../aboutUs/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: Path.Empty, redirectTo: '/', pathMatch: 'full' },
  { path: Path.AboutUs, component: AboutUsListComponent },
  { path: Path.Games, component: GamesListComponent },
  { path: Path.StartPage, component: RegistrationComponent },
];

// const appRoutes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' }, { path: '' }];
@NgModule({
  imports: [RouterModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
