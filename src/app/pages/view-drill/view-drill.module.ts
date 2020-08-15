import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDrillPageRoutingModule } from './view-drill-routing.module';

import { ViewDrillPage } from './view-drill.page';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuillModule.forRoot(),
    SanitizerModule,
    ViewDrillPageRoutingModule
  ],
  declarations: [ViewDrillPage]
})
export class ViewDrillPageModule { }
