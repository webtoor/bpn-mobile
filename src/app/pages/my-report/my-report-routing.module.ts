import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyReportPage } from './my-report.page';

const routes: Routes = [
  {
    path: '',
    component: MyReportPage
  },
  {
    path: 'edit-report/:id',
    loadChildren: () => import('./edit-report/edit-report.module').then( m => m.EditReportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReportPageRoutingModule {}
