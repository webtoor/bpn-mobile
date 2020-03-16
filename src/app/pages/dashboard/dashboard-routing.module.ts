import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'add-location',
    loadChildren: () => import('./add-location/add-location.module').then( m => m.AddLocationPageModule)
  },
  {
    path: 'edit-location/:id',
    loadChildren: () => import('./edit-location/edit-location.module').then( m => m.EditLocationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
