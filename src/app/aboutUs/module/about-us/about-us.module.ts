import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { AboutUsComponent } from '../../about-us/about-us.component';
import { AboutUsListComponent } from '../../about-us-list/about-us-list.component';

const aboutUsRoutes: Routes = [
  { path: '', redirectTo: 'about-us', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
];

@NgModule({
  declarations: [AboutUsComponent, AboutUsListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forChild(aboutUsRoutes),
  ],
  exports: [AboutUsComponent],
})
export class AboutUsModule {}
