import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { AllCommentsInterfaceOrigin, PostInterfaceOrigin, PostInterface } from '../../models/post-and-comment.model';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';

export interface CommentDialogInterface {
  postId: number,
  userName?: string
}

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: PostInterfaceOrigin | null = null;
  allComments: AllCommentsInterfaceOrigin | null = null;
  isDataLoading: boolean = true;
  postId: string = '';

  constructor(
    private route: ActivatedRoute,
    private restService: RestService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      mergeMap(
        param => {
          this.postId = param['postId'];
          return this.requestForPostWithComments();
        }
      )
    )
    .subscribe(
      postWithComments => {
        const postAndComments: [PostInterfaceOrigin, AllCommentsInterfaceOrigin] = postWithComments;
        this.post = postAndComments[0];
        this.allComments = postAndComments[1];
        this.isDataLoading = false;
      }
    )
  }

  private requestForPostWithComments(): Observable<[PostInterfaceOrigin, AllCommentsInterfaceOrigin]>{
    return this.restService.getPostWithComments(this.postId);
  }

  openCommentDialog(): void {
      const dialogRef = this.dialog.open(CommentDialogComponent, {
        maxWidth: '95vw',
        panelClass: 'comment-dialog',
        data: {
          postId : this.post?.id,
          userName: 'Mieszkaniec'
        },
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.isDataLoading = true;
          this.requestForPostWithComments().subscribe(
            {
              next: (postWithComments) => {
                const postAndComments: [PostInterfaceOrigin, AllCommentsInterfaceOrigin] = postWithComments;
                this.post = postAndComments[0];
                this.allComments = postAndComments[1];
                setTimeout(
                  ()=>this.isDataLoading = false, 1000
                );
              }
            }
          )
        }
      });
    }
  
}
