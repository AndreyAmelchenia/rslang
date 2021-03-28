import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReduxModule } from './redux/redux.module';
import { CardsModule } from './components/cards/cards.module';
import { ProfileModule } from './components/profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { AboutUsModule } from './components/aboutUs/modules/about-us.module';
import { GamesModule } from './components/games/games.module';
import { AppComponent } from './components/app/app.component';
import { LocalStorageService } from './common/services/storage/local.service';
import { SessionService } from './common/services/storage/session.service';
import { MemoryService } from './common/services/storage/memory.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CardsModule,
    NavigationModule,
    AboutUsModule,
    GamesModule,
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    ProfileModule,
    SharedModule,
    ReduxModule,
  ],
  providers: [LocalStorageService, SessionService, MemoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
