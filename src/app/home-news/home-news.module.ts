import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppCommonModule,
  ]
})
export class HomeNewsModule { }
