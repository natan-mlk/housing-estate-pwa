import { Component, OnInit } from '@angular/core';
import { DateAndTimeService, RestService } from 'src/app/common/common.module';

export interface CommentInterface {
  content: string;
date: string;
groupId: number;
newsRequest: any;
username: string;
}
export interface PostInterface {
  comments: CommentInterface[];
  recentComment: CommentInterface;
  content: string;
  contentText: string;
  date: string;
  id: number;
  title: string;
  titleText: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: null | any[] = null;

  constructor(
    private restService: RestService,
    private dateService: DateAndTimeService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  getDate(dateBackend: string): string {
    return this.dateService.getFormattedDate(dateBackend);
  }

  private fetchData() {
    this.restService.fetchData().subscribe(
      response => {
        /* [
          0: {id: 184, title: '{"blocks":[{"key":"dmi0k","text":"Rozliczenie Medi…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', titleText: 'Rozliczenie Mediów ', date: '2022-03-22T21:47:11.341+00:00', content: '{"blocks":[{"key":"98fas","text":"Subject: Rozlicz…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', …}
          1: {id: 181, title: '{"blocks":[{"key":"239ht","text":"Apel do Wszystki…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', titleText: 'Apel do Wszystkich Mieszkańców - ogrzewanie hal garażowych', date: '2022-03-14T09:20:38.606+00:00', content: '{"blocks":[{"key":"73pom","text":"Od kilku dni jes…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', …}
          2: {id: 174, title: '{"blocks":[{"key":"9s418","text":"Osiedle Kolibki …:[],"entityRanges":[],"data":{}}],"entityMap":{}}', titleText: 'Osiedle Kolibki - Ber2 - informacje dot. zebrania i uchwał', date: '2022-02-10T16:51:14.562+00:00', content: '{"blocks":[{"key":"92vfk","text":"Gdynia, 10.02.20…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', …}
          3: {id: 173, title: '{"blocks":[{"key":"9h5q5","text":"Tereny zielone p…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', titleText: 'Tereny zielone pomiędzy Osiedlem Rivus i Torami - Plan zagospodarowania', date: '2022-02-10T16:48:31.299+00:00', content: '{"blocks":[{"key":"bgj63","text":"Na Geoportalu 11…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', …}
          4: {id: 172, title: '{"blocks":[{"key":"7v4qc","text":"Tabela z umowami…:[],"entityRanges":[],"data":{}}],"entityMap":{}}', titleText: 'Tabela z umowami', date: '2022-02-03T21:03:19.466+00:00', content: '{"blocks":[{"key":"d6f63","text":"UL. BERNADOWSKA …:[],"entityRanges":[],"data":{}}],"entityMap":{}}', …}
        ]
        */
       let copiedPosts = JSON.parse(JSON.stringify(response));
       this.findNewestComment(copiedPosts);
       this.posts = copiedPosts;
       console.log('RESP, ', response);
       console.log('copiedPosts, ', copiedPosts);
      }
    )
  }

  private findNewestComment(copiedPosts: PostInterface[]) {
    for (let post of copiedPosts) {
      // weź każdy post i kolekcję komentarzy z niego i dodaj jako recetComment najnowszy komentarz 
      // na razie wezmę po prostu ostatni z tablicy
      const commentsArrayLength = post.comments.length;
      if(commentsArrayLength){
        post.comments.splice(0, commentsArrayLength - 1);
      }
    }
  }

}
