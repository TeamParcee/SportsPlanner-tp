import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCoachPageRoutingModule } from './add-coach-routing.module';

import { AddCoachPage } from './add-coach.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCoachPageRoutingModule
  ],
  declarations: [AddCoachPage]
})
export class AddCoachPageModule {}
