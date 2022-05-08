import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
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

  fetchData(): Observable<any> {
    return this.authService.userSubject.pipe(
      take(1), /* jeśli niedałbym take(1) albo zaraz po tym zapytaniu .unsubscribe, to bym dalej bez sensu 'obserwował' Subject z userData po tym zapytaniu */
      exhaustMap( // run second Obs after first one completes and returns value
        userData => {
          return this.httpClient.get(
            'https://mieszkancynowekolibki.pl:8008/api/private/news/newsList?page=1&number=5',
            { headers: this.getAuthHeaders(userData) }
          )
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
