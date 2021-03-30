import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, LoginComponent, RegistrationComponent],
  exports: [NavBarComponent],
  imports: [CommonModule, LayoutModule, SharedModule, AppRoutingModule],
})
export class NavigationModule {}
