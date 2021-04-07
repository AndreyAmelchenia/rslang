import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from '../../shared/material/material.module';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesItemComponent } from './components/games-item/games-item.component';
import { GamesRoutingModule } from './games-routing.module';
import { GamesSprintModule } from './modules/games-sprint/games-sprint.module';

@NgModule({
  declarations: [GamesListComponent, GamesItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    GamesSprintModule,
    GamesRoutingModule,
  ],
  exports: [GamesListComponent, GamesItemComponent],
})
export class GamesModule {}
