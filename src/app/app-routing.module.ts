import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsListComponent } from 'src/app/components/cards/cards-list/cards-list.component';
import { ProfileComponent } from 'src/app/components/profile/profile/profile.component';
import { DictionaryComponent } from './components/dictionary/dictionary/dictionary.component';
import { LoginComponent } from './components/start-page/login/login.component';
import { RegistrationComponent } from './components/navigation/registration/registration.component';
import { Path } from './shared/models/router.model';

import { LoginGuard } from './common/guards/login.guard';

import { AboutUsListComponent } from './components/aboutUs/components/about-us-list/about-us-list.component';
import { GamesRoutingModule } from './components/games/games-routing.module';
import { StartPageComponent } from './components/start-page/start-page/start-page.component';

const appRoutes: Routes = [
  { path: Path.Empty, redirectTo: Path.Empty, pathMatch: 'full', component: StartPageComponent },
  { path: Path.AboutUs, component: AboutUsListComponent },
  { path: Path.Cards, component: CardsListComponent },
  { path: Path.Profile, component: ProfileComponent },
  /* {
    path: Path.Games,
    loadChildren: () => GamesRoutingModule,
  }, */
  {
    path: Path.Games,
    loadChildren: () => import('./components/games/games.module').then((m) => m.GamesModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
  { path: Path.Login, component: LoginComponent },
  { path: Path.Registration, component: RegistrationComponent },
  {
    path: Path.Dictionary,
    loadChildren: () =>
      import('./components/dictionary/dictionary.module').then((m) => m.DictionaryModule),
    canActivate: [LoginGuard],
    canLoad: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
