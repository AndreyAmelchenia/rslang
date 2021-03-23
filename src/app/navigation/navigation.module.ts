import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  exports: [NavBarComponent],
  imports: [CommonModule, LayoutModule, SharedModule],
})
export class NavigationModule {}
