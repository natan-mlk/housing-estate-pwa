import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, forkJoin, map, mergeMap, Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/login-page/auth.service';
import { User } from 'src/app/login-page/user';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  // https://mieszkancynowekolibki.pl:8008/api  <-- API_URL

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
            'https://mieszkancynowekolibki.pl:8008/api/private/news/newsList?page=1&number=5',
            { headers: this.getAuthHeaders(userData) }
          )
          return postsRequest$.pipe(
            mergeMap(
              response => {
                const finalRequestArray$: Observable<any>[] = [];
                const postsCollection = response.content;

                for (let post of postsCollection) {
                  const postWithCommentsRequest$: Observable<any> = this.httpClient.get(
                    `https://mieszkancynowekolibki.pl:8008/api/private/news/single/${post.id}/comments?page=0&commentsNumber=9999`,
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

  getPostWithComments(postId: string): Observable<any[]> {
    return this.authService.userSubject.pipe(
      take(1), /* jeśli niedałbym take(1) albo zaraz po tym zapytaniu .unsubscribe, to bym dalej bez sensu 'obserwował' Subject z userData po tym zapytaniu */
      exhaustMap( // run second Obs after first one completes and returns value
        userData => {
          const postRequest$: Observable<any> = this.httpClient.get(
            `https://mieszkancynowekolibki.pl:8008/api/private/news/single?newsIndex=${postId}`,
            { headers: this.getAuthHeaders(userData) }
          );
          const commentsRequest$: Observable<any> = this.httpClient.get(
            `https://mieszkancynowekolibki.pl:8008/api/private/news/single/${postId}/comments?page=0&commentsNumber=9999`,
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
}
