import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeTeamPageRoutingModule } from './change-team-routing.module';

import { ChangeTeamPage } from './change-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeTeamPageRoutingModule
  ],
  declarations: [ChangeTeamPage]
})
export class ChangeTeamPageModule {}
