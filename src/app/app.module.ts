import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { AboutUsModule } from './aboutUs/module/about-us/about-us.module';
import { AboutUsService } from './aboutUs/service/about-us.service';
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
  ],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
