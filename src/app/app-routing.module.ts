import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./pages/complete-profile/complete-profile.module').then(m => m.CompleteProfilePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'plans',
    loadChildren: () => import('./pages/plans/plans.module').then(m => m.PlansPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./forms/plan/plan.module').then(m => m.PlanPageModule)
  },
  {
    path: 'drill',
    loadChildren: () => import('./forms/drill/drill.module').then(m => m.DrillPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./forms/video/video.module').then(m => m.VideoPageModule)
  },
  {
    path: 'view-drill',
    loadChildren: () => import('./pages/view-drill/view-drill.module').then(m => m.ViewDrillPageModule)
  },
  {
    path: 'add-coach',
    loadChildren: () => import('./forms/add-coach/add-coach.module').then(m => m.AddCoachPageModule)
  },
  {
    path: 'change-team',
    loadChildren: () => import('./forms/change-team/change-team.module').then(m => m.ChangeTeamPageModule)
  }, {
    path: 'drills',
    loadChildren: () => import('./pages/drills/drills.module').then(m => m.DrillsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'crop-image',
    loadChildren: () => import('./forms/crop-image/crop-image.module').then( m => m.CropImagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
