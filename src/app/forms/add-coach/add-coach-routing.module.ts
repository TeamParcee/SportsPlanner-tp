import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCoachPage } from './add-coach.page';

const routes: Routes = [
  {
    path: '',
    component: AddCoachPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCoachPageRoutingModule {}
