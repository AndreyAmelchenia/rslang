import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, RegistrationComponent, LoginComponent],
  exports: [NavBarComponent],
  imports: [CommonModule, LayoutModule, SharedModule, FormsModule],
})
export class NavigationModule {}
