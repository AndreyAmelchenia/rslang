import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { AuthEffects } from './navigation/store/effects/auth.effects';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptorService } from './navigation/services/token-interceptor.service';
import { environment } from '../environments/environment';
import { NavigationModule } from './navigation/navigation.module';

import { AboutUsModule } from './aboutUs/module/about-us/about-us.module';
import { AboutUsService } from './aboutUs/service/about-us.service';
import { GamesModule } from './games/games.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    AboutUsModule,
    GamesModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NavigationModule,
    AboutUsModule,
    StoreModule.forRoot({}),
    StateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    AboutUsService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
