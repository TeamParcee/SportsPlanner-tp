import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadChildren: () => import('../home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
    },
    {
      path: 'drills',
      loadChildren: () => import('../drills/drills.module').then(m => m.DrillsPageModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
    },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
