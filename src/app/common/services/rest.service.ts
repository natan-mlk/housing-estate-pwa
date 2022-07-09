import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, forkJoin, map, mergeMap, Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/login-page/auth.service';
import { User } from 'src/app/login-page/user';
import { AllCommentsInterfaceOrigin, PostInterfaceOrigin } from '../models/post-and-comment.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // https://mieszkancynowekolibki.pl:8008/api  <-- API_URL

  // private urlApiAddress: string = 'https://mieszkancynowekolibki.pl:8008/api/';
  private urlApiAddress: string = 'https://mieszkancyrivus.pl:8008/api/';
  
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getAllPostsWithComments(): Observable<any> {
    return this.authService.userSubject.pipe(
      take(1), /* jeśli niedałbym take(1) albo zaraz po tym zapytaniu .unsubscribe, to bym dalej bez sensu 'obserwował' Subject z userData po tym zapytaniu */
      exhaustMap( // run second Obs after first one completes and returns value
        userData => {
          const postsRequest$: Observable<any> = this.httpClient.get(
            this.urlApiAddress + 'private/news/newsList?page=1&number=5',
            { headers: this.getAuthHeaders(userData) }
          )
          return postsRequest$.pipe(
            mergeMap(
              response => {
                const finalRequestArray$: Observable<any>[] = [];
                const postsCollection = response.content;

                for (let post of postsCollection) {
                  const postWithCommentsRequest$: Observable<any> = this.httpClient.get(
                    this.urlApiAddress +  `private/news/single/${post.id}/comments?page=0&commentsNumber=9999`,
                    { headers: this.getAuthHeaders(userData) }).pipe(
                      map<any, any>(
                        comments => {
                          post.comments = [];
                          for (let comment of comments.content) {
                            post.comments.push(comment)
                          }
                          return post
                        }
                      )
                    );
                  finalRequestArray$.push(postWithCommentsRequest$)
                }
                return forkJoin(finalRequestArray$)
              }
            )
          )
        }
      )
    )
  }

  getPostWithComments(postId: string): Observable<[PostInterfaceOrigin, AllCommentsInterfaceOrigin]> {
    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap( 
        userData => {
          const postRequest$: Observable<PostInterfaceOrigin> = this.httpClient.get<PostInterfaceOrigin>(
            this.urlApiAddress +  `private/news/single?newsIndex=${postId}`,
            { headers: this.getAuthHeaders(userData) }
          );
          const commentsRequest$: Observable<AllCommentsInterfaceOrigin> = this.httpClient.get<AllCommentsInterfaceOrigin>(
            this.urlApiAddress + `private/news/single/${postId}/comments?page=0&commentsNumber=9999`,
            { headers: this.getAuthHeaders(userData) });
            return forkJoin([postRequest$, commentsRequest$])
          }
      )
    )
  }

  getAuthHeaders(userData: User | null) {
    if (userData) {
      return {
        "Authorization": userData.authToken,
        "Content-Type": 'application/json'
      }
    } else {
      return {
        "Authorization": 'lol',
        "Content-Type": 'application/json'
      }
    }
  }

  addComment(newsIndex: number, content: string): Observable<any>{
    const baseURL = this.urlApiAddress + 'private/news' + `/${newsIndex}/addComment`;

    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap( 
        userData => {
          const sendCommentRequest$: Observable<any> = this.httpClient.post(
            baseURL, 
            {'content': content, groupId: 0},
            { headers: this.getAuthHeaders(userData)}
          )

          return sendCommentRequest$;
        }
      )
    )

  }

}
