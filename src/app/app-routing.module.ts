import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsListComponent } from 'src/app/components/cards/cards-list/cards-list.component';
import { ProfileComponent } from 'src/app/components/profile/profile/profile.component';
import { LoginComponent } from './components/navigation/login/login.component';
import { RegistrationComponent } from './components/navigation/registration/registration.component';
import { Path } from './shared/models/roter.modele';

import { AboutUsListComponent } from './components/aboutUs/components/about-us-list/about-us-list.component';

const appRoutes: Routes = [
  { path: Path.Empty, redirectTo: Path.Empty, pathMatch: 'full' },
  { path: Path.AboutUs, component: AboutUsListComponent },
  { path: Path.Cards, component: CardsListComponent },
  { path: Path.Profile, component: ProfileComponent },
  {
    path: Path.Games,
    loadChildren: () =>
      import('./components/games/games-routing.module').then((m) => m.GamesRoutingModule),
  },
  { path: Path.Login, component: LoginComponent },
  { path: Path.Registration, component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
