import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeNewsModule } from './home-news/home-news.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { LoginPageModule } from './login-page/login-page.module';
import { HttpClientModule } from '@angular/common/http';
import { AppCommonModule } from './common/common.module';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppCommonModule, 
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
    }),

    // some info https://web.dev/customize-install/  https://web.dev/manifest-updates/ https://medium.com/poka-techblog/turn-your-angular-app-into-a-pwa-in-4-easy-steps-543510a9b626
    // feature modules below
    HomeNewsModule,
    UserProfileModule,
    AnnouncementsModule,
    LoginPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
