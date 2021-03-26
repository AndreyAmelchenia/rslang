import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import * as authReducer from './store/reducers/auth.reducers';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, RegistrationComponent, LoginComponent],
  exports: [NavBarComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature(authReducer.authFeatureKey, authReducer.authReducer),
  ],
})
export class NavigationModule {}
