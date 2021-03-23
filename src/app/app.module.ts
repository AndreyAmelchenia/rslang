import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AboutUsModule } from "./aboutUs/module/about-us/about-us.module";
import { AboutUsService } from "./aboutUs/service/about-us.service";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AboutUsModule],
  providers: [AboutUsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
