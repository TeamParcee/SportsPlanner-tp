import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrillPageRoutingModule } from './drill-routing.module';

import { DrillPage } from './drill.page';
import { QuillModule } from 'ngx-quill';

var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'clean', 'align', 'underline', 'strike', 'link', 'image', { 'list': 'ordered' }, { 'list': 'bullet' }, 'video',{ size: ['normal', 'large'], }, 'clean'],

        ]
      }
    }),
    DrillPageRoutingModule
  ],
  declarations: [DrillPage]
})
export class DrillPageModule {}
