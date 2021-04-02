import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { GamesRoutingModule } from '../../modules/games-routing.module';
import { AngularMaterialModule } from '../../../../shared/material/material.module';
import { GamesSprintComponent } from '../components/games-sprint.component';
import { GamesSprintCardComponent } from '../components/games-sprint-card/games-sprint-card.component';


@NgModule({
  declarations: [GamesSprintComponent, GamesSprintCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialModule,
    GamesRoutingModule,
  ],
  exports: [GamesSprintComponent, GamesSprintCardComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class GamesSprintModule {}
