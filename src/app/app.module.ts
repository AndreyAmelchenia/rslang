import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { TokenInterceptorService } from './components/navigation/services/token-interceptor.service';
import { ReduxModule } from './redux/redux.module';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { AboutUsModule } from './components/aboutUs/modules/about-us.module';
import { AboutUsService } from './components/aboutUs/services/about-us.service';
import { StartPageModule } from './components/start-page/start-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    StartPageModule,
    NavigationModule,
    AboutUsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ReduxModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    AboutUsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
