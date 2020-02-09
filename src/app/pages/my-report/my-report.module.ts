import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyReportPageRoutingModule } from './my-report-routing.module';

import { MyReportPage } from './my-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyReportPageRoutingModule
  ],
  declarations: [MyReportPage]
})
export class MyReportPageModule {}
