import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutScrollableComponent } from './components/layout-scrollable/layout-scrollable.component';
import { MaterialModule } from '../material.module';
import { LayoutForPostsComponent } from './components/layout-for-posts/layout-for-posts.component';



@NgModule({
  declarations: [
    LayoutScrollableComponent,
    LayoutForPostsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    LayoutScrollableComponent,
    LayoutForPostsComponent
  ]
})
export class AppCommonModule { }
