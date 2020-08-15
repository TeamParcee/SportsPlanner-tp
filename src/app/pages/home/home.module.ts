import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { DurationModule } from 'src/app/pipes/duration/duration.module';
import { QuillModule } from 'ngx-quill';

var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DurationModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'clean', 'align', 'underline', 'strike', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'video',{ size: ['normal', 'large'], }, 'clean'],

        ]
      }
    }),
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
