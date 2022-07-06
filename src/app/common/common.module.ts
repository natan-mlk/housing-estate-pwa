import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutScrollableComponent } from './components/layout-scrollable/layout-scrollable.component';
import { MaterialModule } from '../material.module';
import { LayoutForPostsComponent } from './components/layout-for-posts/layout-for-posts.component';
import { CutCommentCharactersPipe, CutPostCharactersPipe, FormatBackendDatePipe } from './pipes';
import { PostPageComponent } from './components/post-page/post-page.component';
import { RouterModule } from '@angular/router';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
// import { CommentInterface } from './models/post-and-comment.model';

/* poniższe eksporty gwarantują mi, że mogę korzystać z tych serwisów wyłącznie importując je z modułu np: import {RestService} from 'src/app/common/common.module' */
export { DateAndTimeService } from './services/date-and-time.service'
export { RestService } from './services/rest.service';

@NgModule({
  declarations: [
    LayoutScrollableComponent,
    LayoutForPostsComponent,
    // pipes:
    CutPostCharactersPipe,
    CutCommentCharactersPipe,
    FormatBackendDatePipe,
    PostPageComponent,
    CommentDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    LayoutScrollableComponent,
    LayoutForPostsComponent,
    // pipes:
    CutPostCharactersPipe,
    CutCommentCharactersPipe,
    FormatBackendDatePipe
  ]
})
export class AppCommonModule { }
