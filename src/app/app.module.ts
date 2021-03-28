import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { NavigationModule } from './navigation/navigation.module';

import { AboutUsModule } from './aboutUs/module/about-us/about-us.module';
import { AboutUsService } from './aboutUs/service/about-us.service';
import { GamesModule } from './games/games.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './navigation/store/effects/auth.effects';
import { TokenInterceptorService } from './navigation/services/token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    AboutUsModule,
    GamesModule,
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
  ],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
