import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewDrillPage } from './view-drill.page';

const routes: Routes = [
  {
    path: '',
    component: ViewDrillPage
  }, {
    path: ':id',
    component: ViewDrillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewDrillPageRoutingModule { }
