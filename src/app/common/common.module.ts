import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutScrollableComponent } from './components/layout-scrollable/layout-scrollable.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    LayoutScrollableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LayoutScrollableComponent
  ]
})
export class AppCommonModule { }
