import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { AllCommentsInterfaceOrigin, PostInterfaceOrigin, PostInterface } from '../../models/post-and-comment.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: PostInterfaceOrigin | null = null;
  allComments: AllCommentsInterfaceOrigin | null = null;

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      mergeMap(
        param => {
          const postId: string = param['postId'];
          return this.restService.getPostWithComments(postId);
        }
      )
    )
    .subscribe(
      postComments => {
        const postAndComments: [PostInterfaceOrigin, AllCommentsInterfaceOrigin] = postComments;
        this.post = postAndComments[0];
        this.allComments = postAndComments[1];
        console.log('allComments', this.allComments.content);
        
      }
    )
  }

}
