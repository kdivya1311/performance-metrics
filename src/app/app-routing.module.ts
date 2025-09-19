import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'dashboard',
    pathMatch: 'full' 
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'reports', 
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) 
  },
  {
    path: 'standalone',
    loadComponent: () => import('./standalone/standalone.component').then(m => m.StandaloneComponent)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
