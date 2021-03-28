import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ReduxModule } from './redux/redux.module';
import { CardsModule } from './cards/cards.module';
import { WordsEffects } from './redux/effects/words.effects';
import { AppComponent } from './app.component';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { NavigationModule } from './navigation/navigation.module';
import { AboutUsModule } from './aboutUs/modules/about-us.module';
import { AboutUsService } from './aboutUs/services/about-us.service';
import { GamesModule } from './games/games.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    EffectsModule.forRoot([WordsEffects]),
    CardsModule,
    NavigationModule,
    AboutUsModule,
    GamesModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    ProfileModule,
    SharedModule,
    StoreModule.forRoot({}),
    ReduxModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
  ],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
