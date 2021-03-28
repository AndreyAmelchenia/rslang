import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { AboutUsComponent } from '../components/about-us/about-us.component';
import { AboutUsListComponent } from '../components/about-us-list/about-us-list.component';
import { AboutUsService } from '../services/about-us.service';

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
  providers: [AboutUsService],
})
export class AboutUsModule {}
