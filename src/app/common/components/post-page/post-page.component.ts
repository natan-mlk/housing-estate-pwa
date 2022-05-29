import { Component, Input, OnInit } from '@angular/core';
import { PostInterface } from '../../models/post-and-comment.model';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  @Input()post: PostInterface | undefined; 

  constructor() { }

  ngOnInit(): void {
  }

}
