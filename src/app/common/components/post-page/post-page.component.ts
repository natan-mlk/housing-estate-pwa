import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { RestService } from '../../services/rest.service';
import { PostInterface } from '../../models/post-and-comment.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  @Input()post: PostInterface | undefined; 

  constructor(
    private route: ActivatedRoute,
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      mergeMap(
        param => {
        console.log('params 1 , ', param)

          const postId: string = param['postId'];

          return this.restService.getPostWithComments(postId);
          // return postId;
          
        }
      )
    )
    .subscribe(
      param => {
        // const postId: any = param['postId']
        console.log('params 2, ', param)
      }
      
    )
  }

}
