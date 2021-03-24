import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './material/material.module';
import { AppRoutingModule } from './router/app-routing.module';

@NgModule({
  exports: [AngularMaterialModule, AppRoutingModule],
})
export class SharedModule {}
