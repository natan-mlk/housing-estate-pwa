import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCommonModule } from '../common/common.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppCommonModule,
    RouterModule
  ]
})
export class HomeNewsModule { }
