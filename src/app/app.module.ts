import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { firebaseConfig } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { QuillModule } from 'ngx-quill';
import { PlyrModule } from 'ngx-plyr';



firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    PlyrModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'clean', 'align', 'underline', 'strike', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'video', { size: ['normal', 'large'], }, 'clean'],

        ]
      }
    }),
    IonicModule.forRoot({
      mode: 'md'
    }),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
