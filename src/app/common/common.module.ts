import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutScrollableComponent } from './components/layout-scrollable/layout-scrollable.component';
import { MaterialModule } from '../material.module';
import { LayoutForPostsComponent } from './components/layout-for-posts/layout-for-posts.component';

/* poniższe eksporty gwarantują mi, że mogę korzystać z tych serwisów wyłącznie importując je z modułu np: import {RestService} from 'src/app/common/common.module' */
export { DateAndTimeService } from './services/date-and-time.service'
export { RestService } from './services/rest.service';

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
    LayoutForPostsComponent,
  ]
})
export class AppCommonModule { }
