import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';
=======
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> f3b253f8260e7202f6418294efcfa65d834ce49e
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { NavigationModule } from './navigation/navigation.module';
import { AboutUsModule } from './aboutUs/module/about-us/about-us.module';
import { AboutUsService } from './aboutUs/service/about-us.service';
<<<<<<< HEAD
import { GamesModule } from './games/games.module';
import { initialState, reducers } from './app.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NavigationModule,
    AboutUsModule,
    GamesModule,
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot([]),
=======
@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    AboutUsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot({}),
    StateModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
>>>>>>> f3b253f8260e7202f6418294efcfa65d834ce49e
  ],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
