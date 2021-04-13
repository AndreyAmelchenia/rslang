import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { GamesSettingsComponent } from './components/games-settings/games-settings.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
@NgModule({
  declarations: [GamesListComponent, GamesItemComponent, GamesSettingsComponent],
  imports: [CommonModule, HttpClientModule, GamesRoutingModule, SharedModule],
})
export class GamesModule {}
