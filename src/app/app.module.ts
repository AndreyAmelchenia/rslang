import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { AboutUsModule } from "./aboutUs/module/about-us/about-us.module";
import { AboutUsService } from "./aboutUs/service/about-us.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AboutUsModule, SharedModule],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
