import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { GamesRoutingModule } from '../../games-routing.module';
import { AngularMaterialModule } from '../../../../shared/material/material.module';
import { GamesSprintPlayComponent } from './components/games-sprint-play/games-sprint-play.component';
import { GamesSprintCardComponent } from './components/games-sprint-card/games-sprint-card.component';
import { GamesSprintMainComponent } from './components/games-sprint-main/games-sprint-main.component';
import { GamesSprintEndComponent } from './components/games-sprint-end/games-sprint-end.component';
import { GamesSprintRoutingModule } from './games-sprint-routing.module';

@NgModule({
  declarations: [
    GamesSprintMainComponent,
    GamesSprintPlayComponent,
    GamesSprintCardComponent,
    GamesSprintEndComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    GamesRoutingModule,
    GamesSprintRoutingModule,
  ],
  exports: [
    GamesSprintMainComponent,
    GamesSprintPlayComponent,
    GamesSprintCardComponent,
    GamesSprintEndComponent,
  ],
})
export class GamesSprintModule {}
