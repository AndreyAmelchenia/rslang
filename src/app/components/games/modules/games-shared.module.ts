import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { AngularMaterialModule } from 'src/app/shared/material/material.module';
import { FullScreenForGamesComponent } from '../components/full-screen-for-games/full-screen-for-games.component';
import { GamesEndComponent } from '../components/games-end/games-end.component';

@NgModule({
  declarations: [FullScreenForGamesComponent, GamesEndComponent],
  imports: [AngularMaterialModule, MatSortModule],
  exports: [FullScreenForGamesComponent, GamesEndComponent, AngularMaterialModule, MatSortModule],
})
export class GamesSharedModule {}
