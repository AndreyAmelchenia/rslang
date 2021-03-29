import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './components/app/app.component';
import { TokenInterceptorService } from './components/navigation/services/token-interceptor.service';
import { ReduxModule } from './redux/redux.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { NavigationModule } from './components/navigation/navigation.module';

import { AboutUsModule } from './components/aboutUs/modules/about-us.module';
import { AboutUsService } from './components/aboutUs/services/about-us.service';
import { GamesModule } from './components/games/games.module';
import { AuthEffects } from './redux/effects/auth.effects';

import { ProfileModule } from './components/profile/profile.module';
import { CardsModule } from './components/cards/cards.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    AboutUsModule,
    GamesModule,
    CardsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    ReduxModule,
    ProfileModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    AboutUsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
